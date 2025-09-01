using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedData(AppDbContext context)
    {
        if (await context.Users.AnyAsync()) return;
        var memberData = await File.ReadAllTextAsync("Data/members.json");
        var members = JsonSerializer.Deserialize<List<SeedMemberDto>>(memberData);
        if (members == null) return;
        if (members.Count == 0) return;


        foreach (var member in members)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = member.Id,
                DisplayName = member.DisplayName,
                Email = member.Email,
                ImageUrl = member.ImageUrl,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = member.Id,
                    DisplayName = member.DisplayName,
                    DateOfBirth = member.DateOfBirth,
                    Created = member.Created,
                    LastActive = member.LastActive,
                    Description = member.Description,
                    Gender = member.Gender,
                    City = member.City,
                    Country = member.Country,
                    ImageUrl = member.ImageUrl
                }
            };
            user.Member.Photos.Add(new Photo
            {
                Url = member.ImageUrl!,
                MemberId = member.Id
            });
            context.Users.Add(user);
        }
        await context.SaveChangesAsync();
    }
}