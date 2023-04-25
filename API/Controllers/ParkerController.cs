using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ParkerController : ControllerBase
{
    private readonly ILogger<ParkerController> _logger;

    public ParkerController(ILogger<ParkerController> logger)
    {
        _logger = logger;
    }

    // /parker
    //     get: Alle Parker
    //     post: Neuer Parker (gibt lot_id und parker_id zurück)
    // /parker/{parker_id}
    //     get: einzelnen Parker ()
    //     delete: Ausfahrt
    [HttpGet(Name = "GetAllParker")]
    public IEnumerable<Parker> GetAllParker()
    {
        throw new NotImplementedException();
    }

    [HttpPost(Name = "PostNewParker")]
    public IActionResult PostNewParker()
    {
        throw new NotImplementedException();
    }

    [HttpGet("{id:int}",Name = "GetParker")]
    public Parker GetParker(int id)
    {
        throw new NotImplementedException();
    }
    
    [HttpDelete("{id:int}",Name = "GetParker")]
    public Parker DeleteParker(int id)
    {
        throw new NotImplementedException();
    }
}