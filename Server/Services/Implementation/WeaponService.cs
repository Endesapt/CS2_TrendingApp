using Server.Services.Interfaces;
using WeaponsClassLibrary;
using WeaponsClassLibrary.Data;

namespace Server.Services.Implementation
{
    public class WeaponService : IWeaponService
    {
        private readonly ApplicationDbContext _context;
        public WeaponService(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Weapon> GetWeapons(int page, double from, double to, out bool hasMorePages)
        {
            var weapons = _context.Weapons
                .Where((w)=>(w.CurrentPrice>from && w.CurrentPrice<to))
                .OrderByDescending((w)=>w.CurrentPrice)
                .Skip((page-1)*10).Take(11).ToList();
            if (weapons.Count < 11)
            {
                hasMorePages = false;
            }
            else
            {
                hasMorePages = true;
            }
            return weapons.Take(10);

        }
    }
}
