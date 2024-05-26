using WeaponsClassLibrary;

namespace Server.Services.Interfaces
{
    public interface IInventoryService
    {
        Task<IEnumerable<Weapon>> GetInventory(long userId);
    }
}
