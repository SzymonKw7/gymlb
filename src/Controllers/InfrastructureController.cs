using Microsoft.AspNetCore.Mvc;

namespace KalkulatorWILKS.Controllers;

[ApiController]
[Route("[controller]")]
public class InfrastructureController : ControllerBase
{
    [HttpGet]
    public IActionResult GetPingResponse()
    {
        return Ok("PONG");
    }
}