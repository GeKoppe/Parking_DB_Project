using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ParkingLotController : ControllerBase
{
    private readonly ILogger<ParkingLotController> _logger;

    public ParkingLotController(ILogger<ParkingLotController> logger)
    {
        _logger = logger;
    }
    
    // /parking-lots
    //     get: alle Parkplätze
    // /parking-lots/{lot_id}
    //     get: einzelner Parkplatz (belegung, parker-id)

    [HttpGet(Name = "GetParkingLots")]
    public IEnumerable<ParkingLot> GetParkingLots()
    {
        throw new NotImplementedException();
    }
    
    [HttpGet("{id:int}", Name = "GetParkingLot")]
    public ParkingLot GetParkingLot(int id)
    {
        throw new NotImplementedException();
    }
}