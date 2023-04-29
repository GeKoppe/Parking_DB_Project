using System.Data.SqlClient;

namespace API.Models;

public class ParkingLot
{
    public int Id { get; set; }
    public int BelegtVon { get; set; }
    public bool ReserviertFürDauerParker { get; set; }
    
    public static ParkingLot CreateFromReader(SqlDataReader reader)
    {
        return new ParkingLot()
        {
            Id = (int)reader["Id"],
            BelegtVon = (int)reader["BelegtVon"],
            ReserviertFürDauerParker = (bool)reader["ReserviertFürDauerParker"],
        };
    }
}