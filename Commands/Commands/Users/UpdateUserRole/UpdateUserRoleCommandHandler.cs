using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Users.UpdateUserRole
{
    public class UpdateUserRoleCommandHandler(IUserRepository userRepository, IEntityValidatorService<User> userValidator) : IRequestHandler<UpdateUserRoleCommand>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IEntityValidatorService<User> _userValidator = userValidator;

        public async Task Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
        {
            await _userValidator.EntityExistsAsync(request.Id, cancellationToken);

            await _userRepository.UpdateAsync(x => x.Id == request.Id, x => new User { Role = request.Role }, cancellationToken);
        }
    }
}
