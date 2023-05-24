using System.Data.SqlClient;
using System.Globalization;
using API.Models;

namespace API.Data;

public class DbContext
{
    private readonly IConfiguration _configuration;

    public DbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public int MaxParkingLots => int.Parse(_configuration.GetSection("MaxParkingLots").Value, CultureInfo.InvariantCulture);
    public int ReservedLots => int.Parse(_configuration.GetSection("ReservedLots").Value, CultureInfo.InvariantCulture);
    public int MinimumFreeLots => int.Parse(_configuration.GetSection("ReservedLots").Value, CultureInfo.InvariantCulture);

    public double FreeMinutes => double.Parse(_configuration.GetSection("FreeMinutes").Value, CultureInfo.InvariantCulture);
    public double RatePerHour => double.Parse(_configuration.GetSection("RatePerHour").Value, CultureInfo.InvariantCulture);
    public string ConnectionString => _configuration.GetSection("DbConnectionString").Value;

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

    public List<ParkerHistory> GetParkerHistory()
    {
        var parker = new List<ParkerHistory>();
        using SqlConnection connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand($"SELECT ID, Kennzeichen, Einfahrdatum, Ausfahrdatum FROM Parkhaus.dbo.ParkersHistory ORDER BY Einfahrdatum DESC;", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                ParkerHistory hist = ParkerHistory.CreateFromReader(reader);
                Console.WriteLine(hist.AusfahrDatum);
                parker.Add(hist);
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

        if (dauerparker is false && freeLots.Count() - ReservedLots <= MinimumFreeLots)
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
        var command = new SqlCommand($"SELECT TOP(1) * FROM Parkers WHERE Kennzeichen = '{kennzeichen}';", connection);
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
        var command = new SqlCommand($"SELECT TOP(1) * FROM Parkhaus.dbo.Dauerparker WHERE Kennzeichen = '{kennzeichen}';", connection);
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
        var command = new SqlCommand($"SELECT Kennzeichen, Vorname, Nachname FROM Parkhaus.dbo.Dauerparker WHERE Kennzeichen = '{kennzeichen}';", connection);
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
    
    public double CalculateCost(DateTime einfahrDatum, DateTime ausfahrdatum, bool istDauerparker)
    {
        double cost = 0.00;

        if (istDauerparker)
            return cost;
            
        var totalMinutes= (ausfahrdatum - einfahrDatum).TotalMinutes;
        totalMinutes = totalMinutes <= FreeMinutes ? 0.00 : totalMinutes;
        
        cost = Math.Ceiling(totalMinutes / 60) * RatePerHour;
        
        return cost;
    }
}