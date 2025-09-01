using System;

namespace API.DTOs;

public class LoginDto
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public string? ImageUrl { get; set; }

}