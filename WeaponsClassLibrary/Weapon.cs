using System.ComponentModel.DataAnnotations;

namespace WeaponsClassLibrary
{
    public class Weapon
    {
        [Key]
        public required long ClassId { get; set; }
        public required string IconUrl { get; set; } = null!;
        public required string? Type { get; set; } = null!;
        public required string Name { get; set; } = null!;

    }
}
