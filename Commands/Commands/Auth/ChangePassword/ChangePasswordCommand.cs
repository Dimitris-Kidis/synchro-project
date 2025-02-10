using MediatR;

namespace Commands.Commands.Auth.ChangePassword
{
    public class ChangePasswordCommand : IRequest
    {
        public Guid UserId { get; set; }
        public required string OldPassword { get; set; }
        public required string NewPassword { get; set; }
    }
}
