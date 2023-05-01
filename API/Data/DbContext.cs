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

    public int MaxParkingLots => 180;
    public int ReservedLots => 40;
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

    public int GetRandomAvailableLotId(bool dauerparker)
    {
        var freeLots = GetFreeLots();

        if (freeLots.Count() == 0)
            return 0;
        
        var rand = new Random();
        var index = rand.Next(1, freeLots.Count());

        var lot = 0;
        do
        {
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
}