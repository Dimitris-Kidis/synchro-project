using MediatR;

namespace Commands.Commands.Auth.Registration
{
    public class RegistrationCommand : IRequest<Guid>
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required int Age { get; set; }
    }
}
