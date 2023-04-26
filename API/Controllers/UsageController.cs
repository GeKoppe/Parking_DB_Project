using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class UsageController : ControllerBase
{
    private readonly ILogger<UsageController> _logger;
    private readonly DbContext _context;

    public UsageController(ILogger<UsageController> logger, DbContext context)
    {
        _logger = logger;
        _context = context;
    }
    
    // /usage
    //     get: Belegte Parkplätze (Insgesamt + Anahl Dauerparker)

    [HttpGet(Name = "GetUsage")]
    public UsageDto GetUsage()
    {
        throw new NotImplementedException();
    }
}