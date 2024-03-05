using KalkulatorWILKS.Persistance.Models;
using KalkulatorWILKS.request;

namespace KalkulatorWILKS.Services.Interfaces;

public interface IUserService
{
    Task<List<User>> GetUsersAsync(CancellationToken ct);
    Task<User> GetUserAsync(Guid id, CancellationToken ct);
    Task<bool> CreateUserAsync(AddUserDto dto, CancellationToken ct);
    Task<bool> UpdateUserAsync(Guid id, UpdateUserDto user, CancellationToken ct);
}