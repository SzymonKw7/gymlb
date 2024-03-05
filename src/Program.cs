using KalkulatorWILKS.Persistance;
using KalkulatorWILKS.Repositories;
using KalkulatorWILKS.Repositories.Interfaces;
using KalkulatorWILKS.Services;
using KalkulatorWILKS.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((builderContext, configuration) =>
    configuration.ReadFrom.Configuration(builderContext.Configuration));
// Add services to the container.

builder.Services.AddControllersWithViews();

var connectionStrings = builder.Configuration.GetConnectionString("Kalkulator-DB");
builder.Services.AddNpgsql<KalkulatorContext>(connectionStrings);

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

using var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetService<KalkulatorContext>();
context!.Database.Migrate();

app.Run();
