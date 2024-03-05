using System.ComponentModel.DataAnnotations.Schema;
using KalkulatorWILKS.Persistance.Enums;

namespace KalkulatorWILKS.Persistance.Models;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    public required string Name { get; set; }
    public byte[]? ProfilePicture { get; set; }
    public double Weight { get; set; }
    public bool IsMale { get; set; }
    public double Height { get; set; }
    public Category? Category { get; set; }
    public double? Score { get; set; }
}