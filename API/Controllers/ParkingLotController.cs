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

    [HttpGet("{id:int}", Name = "GetParkingLot")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ParkingLot))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParkingLot(int id)
    {
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"SELECT ID, BelegtVon, ReserviertFürDauerparker FROM Parkhaus.dbo.ParkingLots WHERE ID = {id};", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                return new OkObjectResult(ParkingLot.CreateFromReader(reader));
            }
        }
        finally
        {
            reader.Close();
        }

        return BadRequest("Id not found");
    }
    
    [HttpGet(Name = "GetParkingLots")]
    public IActionResult GetParkingLots()
    {
        var lots = new List<ParkingLot>();
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand("SELECT ID, BelegtVon, ReserviertFürDauerparker FROM Parkhaus.dbo.ParkingLots;", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                lots.Add(ParkingLot.CreateFromReader(reader));
            }
        }
        catch
        {
            return BadRequest();
        }
        finally
        {
            reader.Close();
        }

        return Ok(lots);
    }
}