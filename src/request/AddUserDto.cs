namespace KalkulatorWILKS.request;

public record AddUserDto(string Name, string Surname, string Email, DateTime DateofBirth, bool isMale, double BodyWeight, double WeightLifted);