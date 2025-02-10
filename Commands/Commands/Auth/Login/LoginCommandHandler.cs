using Common.Exceptions;
using Core.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Commands.Commands.Auth.Login
{
    public class LoginCommandHandler(
        UserManager<User> userManager
            ) : IRequestHandler<LoginCommand, string>
    {
        private readonly UserManager<User> _userManager = userManager;

        public async Task<string> Handle(LoginCommand command, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByNameAsync(command.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, command.Password))
            {
                throw new ForbiddenAccessException("The password is not valid, please check it again..");
            }

            var userIdString = await _userManager.GetUserIdAsync(user);

            return userIdString;
        }
    }
}
