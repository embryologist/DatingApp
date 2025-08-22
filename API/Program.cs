using System.Reflection;
using API.Data;
using API.Interfaces;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
        //options.UseSqlServer(builder.Configuration.GetConnectionString("ArtCoreOnMac"));

    });
builder.Services.AddCors();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var tokenKey = builder.Configuration["TokenKey"] ?? throw new ArgumentNullException("TokenKey is not configured.");
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(tokenKey)),
            ValidateIssuer = false,
            ValidateAudience = false
        };

    });

builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = builder.Configuration["AutoMapperLicenseKey"] ?? throw new ArgumentNullException("LicenseKey is not configured.");
});

builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddMaps(Assembly.GetExecutingAssembly()); // or specify profiles directly
});

builder.Services.AddLogging(config =>
{
    config.AddConsole(); // Adds the console logging provider
    config.AddDebug();   // Adds the debug output window logging provider
});

var app = builder.Build();
app.UseMiddleware<ExceptionMiddleWare>();

app.UseCors(policy =>
{
    policy.AllowAnyHeader()
          .AllowAnyMethod()
          .WithOrigins("http://localhost:4200", "https://localhost:4200");

});

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// } removed by me

// app.UseHttpsRedirection();removed by me

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
