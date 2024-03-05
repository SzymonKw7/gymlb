using KalkulatorWILKS.Persistance;
using KalkulatorWILKS.Persistance.Models;
using KalkulatorWILKS.Repositories.Interfaces;
using KalkulatorWILKS.request;
using Microsoft.EntityFrameworkCore;

namespace KalkulatorWILKS.Repositories;

public class UserRepository : IUserRepository
{
    private readonly KalkulatorContext _db;

    public UserRepository(KalkulatorContext db)
    {
        _db = db;
    }
    
    public async Task<List<User>> GetUsersAsync(CancellationToken ct)
    {
        var users = await _db.Users.ToListAsync(ct);

        return users;
    }

    public async Task<User> GetUserByIdAsync(Guid id, CancellationToken ct)
    {
        var user = await _db.Users.SingleOrDefaultAsync(u => u.Id == id, ct);

        return user;
    }

    public async Task<bool> AddUser(User user, CancellationToken ct)
    {
        var newUser = new User
        {
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email,
            DateOfBirth = user.DateOfBirth,
            Score = user.Score
        };

        await _db.AddAsync(newUser, ct);
        await _db.SaveChangesAsync(ct);
        
        if (_db.SaveChangesAsync(ct).IsCompletedSuccessfully)
        {
            return true;
        }

        return false;
    }

    public async Task<bool> UpdateUser(Guid id, double score, CancellationToken ct)
    {
        var updatedUser = await _db.Users.SingleOrDefaultAsync(u => u.Id == id, ct);

        if (updatedUser is not null)
        {
            updatedUser.Score = score;
        }
        
        await _db.SaveChangesAsync(ct);

        if (_db.SaveChangesAsync(ct).IsCompletedSuccessfully)
        {
            return true;
        }

        return false;
    }
}