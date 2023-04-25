using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsageController : ControllerBase
{
    private readonly ILogger<UsageController> _logger;

    public UsageController(ILogger<UsageController> logger)
    {
        _logger = logger;
    }
    
    // /usage
    //     get: Belegte Parkplätze (Insgesamt + Anahl Dauerparker)

    [HttpGet(Name = "GetUsage")]
    public UsageDto GetUsage()
    {
        throw new NotImplementedException();
    }
}