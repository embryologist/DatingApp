using System;
using System.ComponentModel.DataAnnotations;

namespace API.Controllers;

public class RegisterDto
{
    [Required]
    public  string DisplayName { get; set; } = string.Empty;
    [Required]
     [EmailAddress]
    public string Email { get; set; } = string.Empty;
     [Required]
    public string Password { get; set; } = string.Empty;
}
