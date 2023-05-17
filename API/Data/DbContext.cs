using System.Data.SqlClient;
using API.Models;

namespace API.Data;

public class DbContext
{
    private readonly IConfiguration _configuration;

    public DbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public int MaxParkingLots => int.Parse(_configuration.GetSection("MaxParkingLots").Value);
    public int ReservedLots => int.Parse(_configuration.GetSection("ReservedLots").Value);
    public double FreeMinutes => double.Parse(_configuration.GetSection("FreeMinutes").Value);
    public double RatePerHour => double.Parse(_configuration.GetSection("RatePerHour").Value);
    public string ConnectionString => _configuration.GetSection("DbConnectionString").Value;

    public ParkingLot? GetParkingLotWithParkerId(int id)
    {
        ParkingLot lot = null;
        
        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand($"SELECT ID, BelegtVon, ReserviertFürDauerparker FROM Parkhaus.dbo.ParkingLots WHERE BelegtVon = {id};", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
                lot = ParkingLot.CreateFromReader(reader);
        }
        finally
        {
            reader.Close();
        }

        return lot;
    }

    public Parker? GetParker(int id)
    {
        Parker parker = null;
        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand($"SELECT * FROM Parkers WHERE Id = {id}", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                parker = Parker.CreateFromReader(reader);
            }
        }
        finally
        {
            reader.Close();
        }

        return parker;
    }
    
    public int GetRandomAvailableLotId(bool dauerparker)
    {
        var freeLots = GetFreeLots();

        if (freeLots.Count() == 0)
            return 0;
        
        var rand = new Random();

        var lot = 0;
        do
        {
            var index = rand.Next(1, freeLots.Count());
            lot = freeLots.Skip(index).Take(1).First();
        } while (dauerparker is false && lot >= MaxParkingLots - ReservedLots && lot <= MaxParkingLots);

        return lot;
    }
    
    public IEnumerable<int> GetLots()
    {
        var lots = new List<int>();

        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand("SELECT ID FROM Parkhaus.dbo.Parkers;", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                lots.Add((int)reader["ID"]);
            }
        }
        catch
        {
            return lots;
        }
        finally
        {
            reader.Close();
        }

        return lots;
    }
    
    public IEnumerable<int> GetFreeLots()
    {
        var allLots = GetLots();
        var freeLots = new List<int>();
        for (var i = 1; i <= MaxParkingLots; i++)
        {
            freeLots.Add(i);
        }

        return freeLots.Except(allLots);
    }

    public bool PlateAlreadyExists(string kennzeichen)
    {
        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand($"SELECT 1 FROM Parkers WHERE Kennzeichen = '{kennzeichen}';", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                return true;
            }
        }
        finally
        {
            reader.Close();
        }

        return false;
    }

    public bool IsLongTermParker(string kennzeichen)
    {
        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand($"SELECT 1 FROM Parkhaus.dbo.Dauerpaker WHERE Kennzeichen = '{kennzeichen}';", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                return true;
            }
        }
        finally
        {
            reader.Close();
        }

        return false;
    }

    public LongTermParker? GetLongTermParkerInfo(string kennzeichen)
    {
        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand($"SELECT ID, Kennzeichen, Vorname, Nachname FROM Parkhaus.dbo.Dauerpaker WHERE Kennzeichen = '{kennzeichen}';", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                return LongTermParker.CreateFromReader(reader);
            }
        }
        finally
        {
            reader.Close();
        }

        return null;   
    }
}