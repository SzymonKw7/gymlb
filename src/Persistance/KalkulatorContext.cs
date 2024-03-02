using KalkulatorWILKS.Persistance.Models;
using Microsoft.EntityFrameworkCore;

namespace KalkulatorWILKS.Persistance;

public class KalkulatorContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(KalkulatorContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}