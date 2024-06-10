using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Server.Services.Interfaces;
using WeaponsClassLibrary;

namespace Server.Controllers
{
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;
        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }
        [HttpGet("getInventory")]
        public async Task<ActionResult<IEnumerable<Weapon>>> GetInventory(string userId)
        {
            if (!long.TryParse(userId, out var userLongId)) return BadRequest("Cannot parse userId from string");

            var weapons =await _inventoryService.GetInventory(userLongId);

            if (weapons == null) return BadRequest($"Cannot get inventory with Id ${userLongId}");

            return Ok(weapons);
        }
    }
}
