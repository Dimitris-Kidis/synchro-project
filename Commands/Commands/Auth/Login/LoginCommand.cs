using MediatR;

namespace Commands.Commands.Auth.Login;

public class LoginCommand : IRequest
{
    public required string Email { get; set; }
    public required string Password { get; set; }
}
