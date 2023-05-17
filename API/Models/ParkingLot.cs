using System.Data.SqlClient;

namespace API.Models;

public class ParkingLot
{
    public int Id { get; set; }
    public int? BelegtVon { get; set; }
    public bool ReserviertFürDauerParker { get; set; }
    
    public static ParkingLot CreateFromReader(SqlDataReader reader)
    {
        var id = (int)reader["Id"];
        var belegtVonObject = reader["BelegtVon"];
        var belegtVon = belegtVonObject.GetType() == typeof(DBNull) ? (int?)null : (int)belegtVonObject;
        var rFDP = (bool)reader["ReserviertFürDauerParker"];
        
        return new ParkingLot()
        {
            Id = id,
            BelegtVon = belegtVon,
            ReserviertFürDauerParker = rFDP
        };
    }
}