using KalkulatorWILKS.Persistance.Models;
using KalkulatorWILKS.Repositories.Interfaces;
using KalkulatorWILKS.request;
using KalkulatorWILKS.Services.Interfaces;

namespace KalkulatorWILKS.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<List<User>> GetUsersAsync(CancellationToken ct)
    {
        return await _repository.GetUsersAsync(ct);
    }

    public async Task<User> GetUserAsync(Guid id, CancellationToken ct)
    {
        return await _repository.GetUserByIdAsync(id, ct);
    }

    public async Task<bool> CreateUserAsync(AddUserDto dto, CancellationToken ct)
    {
        double score;
        
        if (dto.isMale)
        {
            var coeff = 600 / (47.46178854 + dto.BodyWeight * 8.472061379 + double.Pow(dto.BodyWeight, 2) * 0.07369410346 +
                           double.Pow(dto.BodyWeight, 3) * (-0.001395833811) +
                           double.Pow(dto.BodyWeight, 4) * double.Pow(10, -6) * 7.07665973070743 +
                           double.Pow(dto.BodyWeight, 5) * (-1.20804336482315) * double.Pow(10, -8));
            score = coeff * dto.WeightLifted;
        }

        else
        {
            var coeff = 600 / ((-125.4255398) + dto.BodyWeight * 13.71219419 + double.Pow(dto.BodyWeight, 2) * (-0.03307250631) +
                               double.Pow(dto.BodyWeight, 3) * (-0.001050400051) +
                               double.Pow(dto.BodyWeight, 4) * double.Pow(10, -6) * 9.38773881462799 +
                               double.Pow(dto.BodyWeight, 5) * (-2.3334613884954) * double.Pow(10, -8));
            score = coeff * dto.WeightLifted;
        }
        
        var user = new User
        {
            Name = dto.Name,
            Surname = dto.Surname,
            DateOfBirth = dto.DateofBirth,
            Email = dto.Email,
            Score = score
        };
        
        var isCompleted = await _repository.AddUser(user, ct);

        if (isCompleted)
        {
            return true;
        }

        return false;
    }

    public async Task<bool> UpdateUserAsync(Guid id, UpdateUserDto dto, CancellationToken ct)
    {
        double score;
        
        if (dto.isMale)
        {
            var coeff = 600 / (47.46178854 + dto.BodyWeight * 8.472061379 + double.Pow(dto.BodyWeight, 2) * 0.07369410346 +
                               double.Pow(dto.BodyWeight, 3) * (-0.001395833811) +
                               double.Pow(dto.BodyWeight, 4) * double.Pow(10, -6) * 7.07665973070743 +
                               double.Pow(dto.BodyWeight, 5) * (-1.20804336482315) * double.Pow(10, -8));
            score = coeff * dto.WeightLifted;
        }

        else
        {
            var coeff = 600 / ((-125.4255398) + dto.BodyWeight * 13.71219419 + double.Pow(dto.BodyWeight, 2) * (-0.03307250631) +
                               double.Pow(dto.BodyWeight, 3) * (-0.001050400051) +
                               double.Pow(dto.BodyWeight, 4) * double.Pow(10, -6) * 9.38773881462799 +
                               double.Pow(dto.BodyWeight, 5) * (-2.3334613884954) * double.Pow(10, -8));
            score = coeff * dto.WeightLifted;
        }
        
        var isCompleted = await _repository.UpdateUser(id, score, ct);

        if (isCompleted)
        {
            return true;
        }

        return false;
    }
}