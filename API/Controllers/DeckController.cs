using System.Data.SqlClient;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class DeckController : ControllerBase
{
    private readonly ILogger<DeckController> _logger;
    private readonly DbContext _context;

    public DeckController(ILogger<DeckController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet(Name = "GetParkingLotsPaged")]
    [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IEnumerable<IEnumerable<ParkingLot>>))]
    [SwaggerResponse(StatusCodes.Status400BadRequest)]
    public IActionResult GetParkingLotsPaged()
    {
        var deck = new List<List<int>>();
        var lots = _context.GetLots();

        if (lots.Count() == 0)
            return BadRequest();

        if (lots.Count() <= 20)
        {
            deck.Add(new List<int>(lots));
        }
        else
        {
            var result = ChunkLots(lots, 20);

            deck.AddRange(result.Select(d => d.Cast<int>())
                                        .Select(cast => new List<int>(cast)));
        }

        return Ok(deck);
    }

    private IEnumerable<IEnumerable<int>> ChunkLots(IEnumerable<int> lots, int size)
    {
        for (var i = 0; i < (float)lots.Count() / size; i++)
        {
            yield return lots.Skip(i * size).Take(size);
        }
    }
}