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
    public IEnumerable<Parker> Parkers { get; set; }
    public IEnumerable<ParkingLot> ParkingLots { get; set; }
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
}