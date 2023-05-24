using System.Data.SqlClient;
using API.Data;
using API.Models;
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
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ParkerDto))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParker(int id)
    {
        var parker = _context.GetParker(id); 
        
        if (parker is null)
            return BadRequest("Id not found");

        return Ok(new ParkerDto(parker, _context.IsLongTermParker(parker.Kennzeichen)));
    }
    
    [HttpGet(Name = "GetAllParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<ParkerDto>), ContentTypes = new []{"application/json"})]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetAllParker()
    {
        var allParkers = new List<ParkerDto>();
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        var command = new SqlCommand("SELECT * FROM Parkers", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                allParkers.Add(ParkerDto.CreateFromReader(reader));
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

        var lTP = dauerparker ? _context.GetLongTermParkerInfo(kennzeichen) : null;
        
        if (lotId == 0)
            return BadRequest("Parkaus voll");
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        string dateString = einfahrtdatum.ToString("yyyyMMdd HH:mm:ss.fff");
        Console.WriteLine(dateString);
        var command = new SqlCommand($"INSERT INTO Parkhaus.dbo.Parkers (ID, Kennzeichen, Einfahrtdatum) OUTPUT Inserted.Id VALUES({lotId} ,'{kennzeichen}', '{dateString}');", connection);
        connection.Open();
        var reader = command.ExecuteReader();
        try
        {
            while (reader.Read())
            {
                var dto = new NewParkerOutputDto()
                {
                    Id = lotId,
                    Dauerparker = dauerparker,
                    Vorname = lTP?.Vorname,
                    Nachname = lTP?.Nachname,
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
    
    
    [HttpDelete("{id:int}",Name = "Ausfahrt")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CostDto), ContentTypes = new []{"application/json"})]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult ParkerExit(int id)
    {
        var costDto = new CostDto() { Cost = 0 };
        var parker = _context.GetParker(id);
        if (parker is null)
            return BadRequest("Id not found");

        var ausfahrDatum = DateTime.Now;
        
        // TODO - Dauerparker monatlich abrechnen
        if (_context.IsLongTermParker(parker.Kennzeichen))
        {
            costDto.Cost = 0;
        }
        else
        {
            costDto.Cost = _context.CalculateCost(parker.EinfahrDatum, ausfahrDatum);
        }
        
        using SqlConnection connection = new SqlConnection(_context.ConnectionString);
        connection.Open();
        
        var command = new SqlCommand($"INSERT INTO Parkhaus.dbo.ParkersHistory (Kennzeichen, Einfahrdatum, Ausfahrdatum) VALUES('{parker.Kennzeichen}', '{parker.EinfahrDatum.ToString("yyyyMMdd HH:mm:ss.fff")}', '{ausfahrDatum.ToString("yyyyMMdd HH:mm:ss.fff")}');", connection);
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

        // TODO - Dauerparker monatlich abrechnen
        if (_context.IsLongTermParker(parker.Kennzeichen))
            return Ok(costDto);

        costDto.Cost = CalculateCost(parker, ausfahrDatum);

        return Ok(costDto);
    }
}