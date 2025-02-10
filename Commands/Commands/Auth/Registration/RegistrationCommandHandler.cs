using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Commands.Commands.Auth.Registration
{
    public class RegistrationCommandHandler(
        UserManager<User> userManager,
        IUserRepository userRepository,
        IMapper mapper
            ) : IRequestHandler<RegistrationCommand, Guid>
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper mapper = mapper;

        public async Task<Guid> Handle(RegistrationCommand command, CancellationToken cancellationToken)
        {
            bool isExistingEmail = await _userRepository.ExistsAsync(command.Email, cancellationToken);

            if (isExistingEmail)
            {
                throw new BusinessValidationException("User with such an email already exists. Please try another one..");
            }

            User user = mapper.Map<User>(command);

            var result = await _userManager.CreateAsync(user, command.Password);

            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new BusinessValidationException($"Sign Up Errors: {errors}");
            }

            return user.Id;
        }
    }
}
