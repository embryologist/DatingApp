using System;
using API.Entities;

namespace API.Interfaces;

public interface ITokenService
{
    public string CreateToken(AppUser user);
    string CreateRefreshToken();
    bool ValidateRefreshToken(string refreshToken);
    void RevokeRefreshToken(string refreshToken);

}
