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

    [HttpGet(Name = "GetParkerHistory")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(List<ParkerDto>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParkerHistory()
    {
        var parker = _context.GetParkerHistory();

        var parkerDtos =
            parker
                .Select(p => new ParkerDto(p, _context.IsLongTermParker(p.Kennzeichen),
                    _context.CalculateCost(p.EinfahrDatum, p.AusfahrDatum)))
                .ToList();

        var dto = new ParkerHistoryDto()
        {
            Parkers = parkerDtos,
            Count = parkerDtos.Count
        };

        return Ok(dto);
    }
}