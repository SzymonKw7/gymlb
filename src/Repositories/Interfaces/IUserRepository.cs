using KalkulatorWILKS.Persistance.Models;
using KalkulatorWILKS.request;

namespace KalkulatorWILKS.Repositories.Interfaces;

public interface IUserRepository
{
    Task<List<User>> GetUsersAsync(CancellationToken ct);
    Task<User> GetUserByIdAsync(Guid id, CancellationToken ct);
    Task<bool> AddUser(User user, CancellationToken ct);
    Task<bool> UpdateUser(Guid id, double score, CancellationToken ct);
}