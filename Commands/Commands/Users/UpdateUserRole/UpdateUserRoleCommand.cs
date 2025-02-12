using MediatR;
using static Common.Enums.RoleTypeEnum;

namespace Commands.Commands.Users.UpdateUserRole
{
    public class UpdateUserRoleCommand : IRequest
    {
        public Guid Id { get; set; }
        public RoleType Role { get; set; }
    }
}
