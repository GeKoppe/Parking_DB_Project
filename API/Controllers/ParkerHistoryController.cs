using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ParkerHistoryController : ControllerBase
{
    private readonly ILogger<ParkerController> _logger;
    private readonly DbContext _context;

    public ParkerHistoryController(ILogger<ParkerController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    [HttpGet("{id:int}", Name = "GetParker")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(List<ParkerDto>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParker(int id)
    {
        var parker = _context.GetParkerHistory(); 
        
        if (parker is null)
            return BadRequest("Id not found");

        var parkerDtos = 
            parker.Select(p => new ParkerDto(p, _context.IsLongTermParker(p.Kennzeichen))).ToList();

        var dto = new ParkerHistoryDto()
        {
            Parkers = parkerDtos,
            Count = parkerDtos.Count
        };

        return Ok(dto);
    }
}