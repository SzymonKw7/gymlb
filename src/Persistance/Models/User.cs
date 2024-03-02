namespace KalkulatorWILKS.Persistance.Models;

public class User
{
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Surname { get; set; }
    public required string Email { get; init; }
    public required DateTime DateOfBirth { get; init; }
    public double? Score { get; set; }
}