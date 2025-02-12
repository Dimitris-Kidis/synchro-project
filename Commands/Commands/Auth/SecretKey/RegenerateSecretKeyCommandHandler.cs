using Common.Exceptions;
using Common.Helpers.SecretKeyGenerator;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.UserRepository;
using MediatR;

namespace Commands.Commands.Auth.SecretKey
{
    public class RegenerateSecretKeyCommandHandler(
        IUserRepository userRepository,
        ICurrentUserProvider currentUserProvider
            ) : IRequestHandler<RegenerateSecretKeyCommand, string>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly ICurrentUserProvider _currentUserProvider = currentUserProvider;

        public async Task<string> Handle(RegenerateSecretKeyCommand command, CancellationToken cancellationToken)
        {
            var currentUserId = _currentUserProvider.GetCurrentUserId();

            if (currentUserId == null || !currentUserId.HasValue)
            {
                throw new BusinessValidationException("User not found");
            }

            string newSecretKey = SecretKeyGenerator.GenerateSecretKey();

            await _userRepository.UpdateAsync(x => x.Id == currentUserId.Value, x => new User { SecretKey = newSecretKey }, cancellationToken);

            return newSecretKey;
        }
    }
}
