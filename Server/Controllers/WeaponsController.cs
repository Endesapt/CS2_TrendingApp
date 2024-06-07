using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models.ResponseModels;
using Server.Services.Implementation;
using Server.Services.Interfaces;
using WeaponsClassLibrary;

namespace Server.Controllers
{
    [Route("api/")]
    [ApiController]
    public class WeaponsController : ControllerBase
    {
        private readonly IWeaponService _weaponService;
        public WeaponsController(IWeaponService weaponService)
        {
            _weaponService= weaponService;
        }
        [HttpGet("getWeapons")]
        public ActionResult<GetWeaponsModel> GetWeapons(int page=1,double from=0,double to=10000)
        {
            if (from >= to) return BadRequest("From must be greater then to");
            if (page < 1) return BadRequest("Page must be greater than 1");
            var weapons = _weaponService.GetWeapons(page,from,to, out var hasMorePages);
            GetWeaponsModel model = new GetWeaponsModel() {
                Weapons=weapons,
                HasMorePages=hasMorePages,
                LastWeaponId=weapons.Last().ClassId
            };
            return model;
        }
        [HttpGet("findWeapons")]
        public ActionResult<IEnumerable<SearchModel>>FindWeapons(string searchString)
        {
            if (searchString == null) return new List<SearchModel>();
            var res= _weaponService.FindWeapons(searchString);
            return Ok(res);
        }
        [HttpGet("getWeaponById")]
        public ActionResult<Weapon> GetWeaponsById(string id)
        {
            if (id == null) return BadRequest("No id provided");
            var res = _weaponService.GetWeaponById(long.Parse(id));
            if (res == null) return BadRequest($"No weapon with such Id: {id}");
            return Ok(res);
        }
        [HttpGet("getWeaponPriceHistory")]
        public ActionResult<IEnumerable<WeaponPrice>> GetWeaponPriceHistory(string id)
        {
            if (id == null) return BadRequest("No id provided");
            var prices = _weaponService.GetWeaponPriceHistory(id);
            if (prices == null || prices.Count()==0) return BadRequest($"No weapon with such Id: {id}");
            var res = new WeaponHistoryResponse()
            {
                WeaponClassId = id,
                Prices=prices.Select(p=>new HistoryPriceInfo() { 
                    Price=p.Price,
                    PriceTime=p.PriceTime,  
                }),
            };
            return Ok(res);
        }
    }
}
