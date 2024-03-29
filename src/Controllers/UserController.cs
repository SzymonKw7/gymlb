using KalkulatorWILKS.Persistance.Models;
using KalkulatorWILKS.request;
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

    [HttpPost]
    public async Task<IActionResult> AddUser([FromForm]AddUserDto dto, CancellationToken ct)
    {
        var isCompleted = await _service.CreateUserAsync(dto, ct);

        if (isCompleted)
        {
            return Created();
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id, CancellationToken ct)
    {
        var isCompleted = await _service.DeleteUserAsync(id, ct);

        if (isCompleted)
        {
            return NoContent();
        }

        return NotFound();
    }
}