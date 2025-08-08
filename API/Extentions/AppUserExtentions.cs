using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extentions;

public static class AppUserExtentions // static so we don't create an instance of this class
{
    public static UserDto ToDto (this AppUser user, ITokenService tokenService) // extension method for AppUser to convert it to UserDto
    {
        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user) // Assuming tokenService is available in the context
        };
    }
}
