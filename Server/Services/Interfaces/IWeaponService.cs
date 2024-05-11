using WeaponsClassLibrary;

namespace Server.Services.Interfaces
{
    public interface IWeaponService
    {
        IEnumerable<Weapon> GetWeapons(int page,double from,double to, out bool hasMorePages);
    }
}
