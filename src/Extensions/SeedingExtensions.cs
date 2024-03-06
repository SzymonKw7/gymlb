using KalkulatorWILKS.InitSetup;
using KalkulatorWILKS.Persistance;

namespace KalkulatorWILKS.Extensions;

public static class SeedingExtensions
{
   public static IApplicationBuilder SeedDatabase(this IApplicationBuilder builder)
   {
      var scope = builder.ApplicationServices.CreateScope();
      var serviceProvider = scope.ServiceProvider;
      var dbContext = serviceProvider.GetService<KalkulatorContext>();
      
      ArgumentNullException.ThrowIfNull(dbContext);
      
      UserSeeder.Seed(dbContext);
      return builder;
   }
}