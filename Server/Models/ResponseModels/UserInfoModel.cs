namespace Server.Models.ResponseModels
{
    public class UserInfoModel
    {
        public string UserName { get; set; }
        public long UserId { get; set; }
        public string ImageHash {  get; set; }
        public bool IsAuthenticated {  get; set; }
    }
}
