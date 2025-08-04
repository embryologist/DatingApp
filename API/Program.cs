using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
        //options.UseSqlServer(builder.Configuration.GetConnectionString("ArtCoreOnMac"));

   });
builder.Services.AddCors();


// // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi(); removed by me

var app = builder.Build();

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

// app.UseAuthorization();removed by me

app.MapControllers();

app.Run();
