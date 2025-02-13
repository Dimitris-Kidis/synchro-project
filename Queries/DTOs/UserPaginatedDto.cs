using static Common.Enums.RoleTypeEnum;

namespace Queries.DTOs
{
    public class UserPaginatedDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string? Image { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public RoleType Role { get; set; }
        public GroupInfoDto GroupInfo { get; set; }
    }
}
