using System.Data.SqlClient;
using System.Runtime.InteropServices.JavaScript;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ParkerController : ControllerBase
{
    private readonly ILogger<ParkerController> _logger;
    private readonly DbContext _context;

    public ParkerController(ILogger<ParkerController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }

    // /parker
    //     get: Alle Parker
    //     post: Neuer Parker (gibt lot_id und parker_id zurück)
    // /parker/{parker_id}
    //     get: einzelnen Parker ()
    //     delete: Ausfahrt
    
    [HttpGet("{id:int}", Name = "GetParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(Parker))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParker(int id)
    {
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"SELECT * FROM Parkers WHERE Id = {id}", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                return new OkObjectResult(Parker.CreateFromReader(reader));
            }
        }
        finally
        {
            reader.Close();
        }

        return BadRequest("Id not found");
    }
    
    [HttpGet(Name = "GetAllParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<Parker>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetAllParker()
    {
        var allParkers = new List<Parker>();
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand("SELECT * FROM Parkers", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                allParkers.Add(Parker.CreateFromReader(reader));
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

        return Ok(allParkers);
    }

    [HttpPost(Name = "PostNewParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(PostParkerDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult PostParker(string Kennzeichen, int Dauerparker, DateTime Einfahrtdatum, DateTime Ausfahrtdatum)
    {
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"INSERT INTO Parkhaus.dbo.Parkers (Kennzeichen, Dauerparker, Einfahrtdatum, Ausfahrtdatum) OUTPUT Inserted.Id VALUES('{Kennzeichen}', '{Dauerparker}', '{Einfahrtdatum.ToString("yyyy-MM-dd HH:mm:ss.fff")}', '{Ausfahrtdatum.ToString("yyyy-MM-dd HH:mm:ss.fff")}');", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                var parkerId = (int)reader["Id"];
                var lot = _context.GetParkingLotWithParkerId(parkerId);
                
                if(lot is null)
                    break;
                
                var dto = new PostParkerDto()
                {
                    Lot_Id = lot.Id,
                    Parker_Id = parkerId
                };
                return Ok(dto);
            }
        }
        finally
        {
            reader.Close();
        }
        
        return BadRequest("Id not found");

    }

    [HttpDelete("{id:int}",Name = "Delete")]
    [SwaggerResponse(StatusCodes.Status200OK)]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult DeleteParker(int id)
    {
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"DELETE FROM Parkhaus.dbo.Parkers WHERE ID={id};", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            if (reader.RecordsAffected == 0)
                return BadRequest("Id not found");
        }
        finally
        {
            reader.Close();
        }

        return Ok();
    }
}