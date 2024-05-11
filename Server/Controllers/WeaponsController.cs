﻿using Microsoft.AspNetCore.Http;
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
            if (from <= to) return BadRequest("From must be greater then to");
            var weapons = _weaponService.GetWeapons(page,from,to, out var hasMorePages);
            GetWeaponsModel model = new GetWeaponsModel() {
                Weapons=weapons,
                HasMorePages=hasMorePages,
                LastWeaponId=weapons.Last().ClassId
            };
            return model;
        }
    }
}
