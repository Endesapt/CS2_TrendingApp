using Server.Models.ResponseModels;
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

        public IEnumerable<SearchModel> FindWeapons(string searchString)
        {
            searchString = searchString.Trim().ToLower();
            var res = _context.Weapons.Where(w => w.Name.ToLower().Contains(searchString)).Select(w => new SearchModel
            {
                ResultId = w.ClassId.ToString(),
                ResultString=w.Name

            }).Take(5);
            return res;
           
        }

        public Weapon? GetWeaponById(long id)
        {
            return _context.Weapons.FirstOrDefault(w=>w.ClassId==id);
        }

        public IEnumerable<WeaponPrice> GetWeaponPriceHistory(string id)
        {
            long weaponId=long.Parse(id);
            var res=_context.WeaponsPrices.Where(wp=>wp.WeaponClassId==weaponId).OrderBy(wp=>wp.PriceTime);
            return res;
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
