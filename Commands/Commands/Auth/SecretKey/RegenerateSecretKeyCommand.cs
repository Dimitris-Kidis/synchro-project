using MediatR;

namespace Commands.Commands.Auth.SecretKey
{
    public class RegenerateSecretKeyCommand : IRequest<string> { }
}
