using WeaponsClassLibrary;

namespace Server.Dto
{
    public class UserQueryDto
    {
        public long WeaponClassId { get; set; }
        public int MaxPrice { get; set; }
        public int MinValue { get; set; }
    }
}
