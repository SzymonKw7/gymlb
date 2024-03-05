using KalkulatorWILKS.Persistance.Models;
using KalkulatorWILKS.Services.Interfaces;
using KalkulatorWILKS.Wrapper;
using Microsoft.AspNetCore.Mvc;

namespace KalkulatorWILKS.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _service;
    
    public UserController(IUserService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers(CancellationToken ct)
    {
        var users = await _service.GetUsersAsync(ct);
        return Ok(new Response<List<User>>(users));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser([FromRoute] Guid id, CancellationToken ct)
    {
        var user = await _service.GetUserAsync(id, ct);
        return Ok(new Response<User>(user));
    }
}