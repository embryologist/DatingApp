using System;
using System.Security.Cryptography;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController
{
    [HttpPost("register")] //api/account/register
    public async Task<ActionResult<AppUser>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Email))
        {
            return BadRequest("Email is already in use");
        }
        using var hmac = new HMACSHA512();
        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user); // not using AddAsync, here we only make changes in memory, not call to the DB --- very Important, only used when pregenerate a number from DBs
        await context.SaveChangesAsync();

        return user;
    }
    [HttpPost("login")] //api/account/login
    public async Task<ActionResult<AppUser>> Login(LoginDto loginDto)
    {
        var user = await context.Users.SingleOrDefaultAsync(x => x.Email == loginDto.Email);
        if (user == null) return Unauthorized("Invalid email");
        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(loginDto.Password));
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized("Invalid password");
            }
            return user;
        }
        // Implementation for login will go here
        return Ok("Login functionality not implemented yet.");
    }
    private async Task<bool> UserExists(string email)
    {
        return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
    }

}
