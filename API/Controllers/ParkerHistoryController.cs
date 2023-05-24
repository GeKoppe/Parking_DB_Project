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
                .Select(p =>
                {
                    var isLongTermParker = _context.IsLongTermParker(p.Kennzeichen);
                    var cost = _context.CalculateCost(p.EinfahrDatum, p.AusfahrDatum, isLongTermParker);
                    return new ParkerHistoryDto(p, isLongTermParker, cost);
                })
                .ToList();

        return Ok(parkerDtos);
    }
}