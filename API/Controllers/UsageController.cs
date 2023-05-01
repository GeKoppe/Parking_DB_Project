using System.Data.SqlClient;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsageController : ControllerBase
{
    private readonly ILogger<UsageController> _logger;
    private readonly DbContext _context;

    public UsageController(ILogger<UsageController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    // /usage
    //     get: Belegte Parkplätze (Insgesamt + Anahl Dauerparker)

    [HttpGet(Name = "GetUsage")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(UsageDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetUsage()
    {
        var dto = new UsageDto();
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"SELECT COUNT(*) AS Usage FROM Parkers; ;", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                var usage = (int)reader["Usage"];

                var usedLots = _context.GetLots();
                var freeLots = _context.GetFreeLots();

                dto.FreeLots = freeLots.Count();
                dto.UsedParkingLots = usedLots.Count();
                dto.UsedLongTermParkingLots =
                    usedLots.Count(lot =>
                        lot >= _context.MaxParkingLots - _context.ReservedLots && lot <= _context.MaxParkingLots);
                dto.FreeLongTermParkingLots = _context.ReservedLots - dto.UsedLongTermParkingLots;
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

        return Ok(dto);
    }
}
