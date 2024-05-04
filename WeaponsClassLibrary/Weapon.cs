using System.ComponentModel.DataAnnotations;

namespace WeaponsClassLibrary
{
    public class Weapon
    {
        [Key]
        public required long ClassId { get; set; }
        [MaxLength(255)]
        public required string IconUrl { get; set; } = null!;
        [MaxLength(32)]
        public required string? Type { get; set; } = null!;
        [MaxLength(255)]
        public required string Name { get; set; } = null!;
        public required double CurrentPrice {get;set;}
    }
}
