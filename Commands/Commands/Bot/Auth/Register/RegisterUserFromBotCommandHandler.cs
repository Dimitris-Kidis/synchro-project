using Commands.Commands.Bot.Common.DTOs;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Bot.Auth.Register
{
    public class RegisterUserFromBotCommandHandler(
    IUserRepository userRepository
    ) : IRequestHandler<RegisterUserFromBotCommand, SimpleResponseDto>
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<SimpleResponseDto> Handle(RegisterUserFromBotCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _userRepository
                .GetAll()
                .Where(x => x.SecretKey == request.SecretKey)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentUser == null)
            {
                return new SimpleResponseDto
                {
                    IsSuccessful = false,
                };
            }

            await _userRepository.UpdateAsync(x => x.Id == currentUser.Id, x => new User { TelegramChatId = request.TelegramChatId }, cancellationToken);

            return new SimpleResponseDto
            {
                IsSuccessful = true,
                Message = $"Регистрация прошла успешно. Добро пожаловать, {currentUser.FirstName} {currentUser.LastName}!"
            };
        }
    }
}
