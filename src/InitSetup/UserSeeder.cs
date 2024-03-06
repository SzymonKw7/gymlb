using KalkulatorWILKS.Persistance;
using KalkulatorWILKS.Persistance.Enums;
using KalkulatorWILKS.Persistance.Models;

namespace KalkulatorWILKS.InitSetup;

public static class UserSeeder
{
    public static void Seed(KalkulatorContext context)
    {
        if (context.Users.Any())
        {
            return;
        }

        var users = new User[]
        {
            new()
            {
                Name = "Jan", Category = Category.Noob, Height = 160, Weight = 50, IsMale = true, Score = 150
            },
            new()
            {
                Name = "Twojen mamen", Category = Category.Pro, Height = 150, IsMale = false, Score = 150, Weight = 60
            },
            new() { Name = "Owca", Category = Category.Noob, Height = 170, Score = 100, IsMale = true, Weight = 90 },
            new()
            {
                Name = "Mariusz Pudzianowski", Category = Category.Pro, Height = 190, Weight = 100, IsMale = true,
                Score = 200
            },
            new()
            {
                Name = "Mateusz Kieliszkowski", Category = Category.Pro, Height = 200, Weight = 120, Score = 210,
                IsMale = true
            }
        };
        
        context.Users.AddRange(users);
        context.SaveChanges();
    }
}