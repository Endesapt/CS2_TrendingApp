using Server.Models.ResponseModels;
using WeaponsClassLibrary;

namespace Server.Services.Interfaces
{
    public interface IWeaponService
    {
        IEnumerable<Weapon> GetWeapons(int page,double from,double to, out bool hasMorePages);
        IEnumerable<SearchModel> FindWeapons(string searchString);

        Weapon? GetWeaponById(long id);
    }
}
