using KalkulatorWILKS.Persistance.Enums;

namespace KalkulatorWILKS.request;

public record AddUserDto(string Name, double Height, IFormFile? ProfilePicture, bool IsMale, Category Category, double BodyWeight, double WeightLifted);