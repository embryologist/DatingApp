using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;
namespace API.Services;

public class TokenService(IConfiguration config) : ITokenService
{
    public string CreateRefreshToken()
    {
        throw new NotImplementedException();
    }

    public string CreateToken(AppUser user)
    {
        var tokenKey = config["TokenKey"] ?? throw new ArgumentNullException("TokenKey is not configured.");
        // Null collescing operator to ensure the token key is not null
        if (tokenKey.Length < 64)

            throw new Exception("Token key must be at least 64 characters long.");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)); // same key is used for enacrypting and decrypting and decrypting

        var claims = new List<Claim>
        {
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id.ToString())
        };
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    public void RevokeRefreshToken(string refreshToken)
    {
        throw new NotImplementedException();
    }

    public bool ValidateRefreshToken(string refreshToken)
    {
        throw new NotImplementedException();
    }
    
}
