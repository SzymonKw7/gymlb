namespace KalkulatorWILKS.request;

public record AddUserDto(string Name, double Height, IFormFile? ProfilePicture, bool IsMale, double BodyWeight, double WeightLifted);