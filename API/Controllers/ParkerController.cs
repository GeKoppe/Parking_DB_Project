using System.Data.SqlClient;
using System.Runtime.InteropServices.JavaScript;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
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
        var parker = _context.GetParker(id);

        if (parker is null)
            return BadRequest("Id not found");

        return Ok(parker);
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

    [HttpPost(Name = "Einfahrt")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(NewParkerOutputDto), ContentTypes = new []{"application/json"})]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult ParkerEntry(string kennzeichen)
    {
        if (_context.PlateAlreadyExists(kennzeichen))
            return BadRequest("Kennzeichen bereits im Parkhaus");
        
        var einfahrtdatum = DateTime.Now;
        var dauerparker = _context.IsLongTermParker(kennzeichen);
        var lotId = _context.GetRandomAvailableLotId(dauerparker);

        if (lotId == 0)
            return BadRequest("Parkaus voll");
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand($"INSERT INTO Parkhaus.dbo.Parkers (ID, Kennzeichen, Einfahrtdatum) OUTPUT Inserted.Id VALUES({lotId} ,'{kennzeichen}', '{einfahrtdatum.ToString("yyyy-MM-dd HH:mm:ss.fff")}');", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                var dto = new NewParkerOutputDto()
                {
                    Lot_Id = lotId,
                    Parker_Id = lotId
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
    public IActionResult ParkerExit(int id)
    {
        var parker = _context.GetParker(id);

        if (parker is null)
            return BadRequest("Id not found");
        
        parker.AusfahrDatum = DateTime.Now;

        var cost = CalculateCost(parker);
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        connection.Open();
        
        var command = new SqlCommand($"INSERT INTO Parkhaus.dbo.ParkersHistory (Kennzeichen, Einfahrtdatum, Ausfahrtdatum) VALUES('{parker.Kennzeichen}', '{parker.EinfahrDatum.ToString("yyyy-MM-dd HH:mm:ss.fff")}', '{parker.AusfahrDatum.Value.ToString("yyyy-MM-dd HH:mm:ss.fff")}');", connection);
        var reader = command.ExecuteReader();
        try
        {
            if (reader.RecordsAffected == 0)
                return BadRequest("Writing error");
        }
        finally
        {
            reader.Close();
        }
        
        command = new SqlCommand($"DELETE FROM Parkhaus.dbo.Parkers WHERE ID={id};", connection);
        reader = command.ExecuteReader();
        try
        {
            if (reader.RecordsAffected == 0)
                return BadRequest("Id not found");
        }
        finally
        {
            reader.Close();
        }

        return Ok(cost);
    }

    private double CalculateCost(Parker parker)
    {
        double cost = 0.00;
        
        var totalMinutes= (parker.AusfahrDatum.Value - parker.EinfahrDatum).TotalMinutes;
        totalMinutes = totalMinutes <= _context.FreeMinutes ? 0.00 : totalMinutes;
        
        cost = Math.Ceiling(totalMinutes / 60) * _context.RatePerHour;
        
        return cost;
    }
}