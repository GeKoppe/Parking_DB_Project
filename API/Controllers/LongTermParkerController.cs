using System.Data.SqlClient;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class LongTermParkerController : ControllerBase
{
    private readonly ILogger<LongTermParkerController> _logger;
    private readonly DbContext _context;

    public LongTermParkerController(ILogger<LongTermParkerController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetLongTermParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(LongTermParkerDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetLongTermParker(string kennzeichen)
    {
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"SELECT Kennzeichen, Vorname, Nachname FROM Parkhaus.dbo.Dauerpaker WHERE Kennzeichen = '{kennzeichen}';", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                return Ok(LongTermParkerDto.CreateFromReader(reader));
            }

            return BadRequest("Kennzeichen nicht gefunden");
        }
        finally
        {
            reader.Close();
        }
    }
    
    [HttpPost(Name = "PostLongTermParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(LongTermParkerDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult PostLongTermParker([FromBody] LongTermParker parker)
    {
        LongTermParkerDto? dto = null;
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"INSERT INTO Parkhaus.dbo.Dauerpaker (Kennzeichen, Vorname, Nachname) VALUES('{parker.Kennzeichen}', '{parker.Vorname}', '{parker.Nachname}');SELECT Kennzeichen, Vorname, Nachname FROM Parkhaus.dbo.Dauerpaker WHERE Kennzeichen = '{parker.Kennzeichen}';", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
                dto = LongTermParkerDto.CreateFromReader(reader);
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