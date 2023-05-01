using System.Data.SqlClient;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ParkingLotController : ControllerBase
{
    private readonly ILogger<ParkingLotController> _logger;
    private readonly DbContext _context;

    public ParkingLotController(ILogger<ParkingLotController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    // /parking-lots
    //     get: alle Parkplätze
    // /parking-lots/{lot_id}
    //     get: einzelner Parkplatz (belegung, parker-id)

    [HttpGet(Name = "GetParkingLots")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<ParkingLot>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParkingLots(bool freeOnly)
    {
        var lots = freeOnly ? _context.GetFreeLots() : _context.GetLots();

        if (lots is null)
            return BadRequest();
                
        return Ok(lots);
    }

}