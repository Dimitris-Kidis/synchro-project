using static Common.Enums.RoleTypeEnum;

namespace Queries.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string SecretKey { get; set; }
        public RoleType Role { get; set; }
        public Guid? GroupId { get; set; }
        public string Image { get; set; }
    }
}