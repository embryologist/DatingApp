using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Member
{
    public string Id { get; set; } = null!;
    public DateOnly DateOfBirth { get; set; }
    public required string DisplayName { get; set; }
    public string? ImageUrl { get; set; }
    public string? Gender { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    [JsonIgnore]
    //Navigation Properties
    [ForeignKey(nameof(Id))]
    public AppUser AppUser { get; set; } = null!;
    [JsonIgnore]
    public List<Photo> Photos { get; set; } = [];
}
