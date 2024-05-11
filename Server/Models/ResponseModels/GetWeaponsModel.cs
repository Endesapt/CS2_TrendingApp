using WeaponsClassLibrary;

namespace Server.Models.ResponseModels
{
    public class GetWeaponsModel
    {
        public required IEnumerable<Weapon> Weapons { get; set; }
        public required bool HasMorePages { get; set; }
        public required long LastWeaponId { get; set; }
    }
}
