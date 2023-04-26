using API.Models;

namespace API.Data;

public class DbContext
{
    public IEnumerable<Parker> Parkers { get; set; }
    public IEnumerable<ParkingLot> ParkingLots { get; set; }
    public string ConnectionString => "testlol";
}