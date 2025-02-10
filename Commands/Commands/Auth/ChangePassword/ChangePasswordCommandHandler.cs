using Common.Exceptions;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Commands.Commands.Auth.ChangePassword
{
    public class ChangePasswordCommandHandler(UserManager<User> userManager, IUserRepository userRepository) : IRequestHandler<ChangePasswordCommand>
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly IUserRepository _userRepository = userRepository;

        public async Task Handle(ChangePasswordCommand command, CancellationToken cancellationToken)
        {
            var userToUpdate = await _userRepository.GetByIdAsync(command.UserId, cancellationToken);

            if (userToUpdate == null)
            {
                throw new BusinessValidationException("User with such id can't be found");
            }

            if (userToUpdate.Password.Equals(command.NewPassword))
            {
                throw new BusinessValidationException("Your old password is the same as the new one. Please make sure the new one is different..");
            }

            if (!userToUpdate.Password.Equals(command.OldPassword))
            {
                throw new BusinessValidationException("Your old password is invalid. Check the previous password..");
            }

            userToUpdate.Password = command.NewPassword;

            await _userRepository.UpdateAsync(userToUpdate, cancellationToken);

            var user = await _userManager.FindByIdAsync($"{command.UserId}");
            await _userManager.ChangePasswordAsync(user, command.OldPassword, command.NewPassword);
        }
    }
}
