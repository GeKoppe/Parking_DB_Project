namespace API.Models;

public class UsageDto
{
    public int FreeLots { get; set; }
    public int UsedParkingLots { get; set; }
    public int FreeLongTermParkingLots { get; set; }
    public int UsedLongTermParkingLots { get; set; }

}