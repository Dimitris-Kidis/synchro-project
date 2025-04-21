using Commands.Commands.Bot.Common.DTOs;
using Common.Helpers.SecretKeyGenerator;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Bot.Auth.Delete
{
    public class DeleteUserFromBotCommandHandler(
    IUserRepository userRepository
    ) : IRequestHandler<DeleteUserFromBotCommand, SimpleResponseDto>
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<SimpleResponseDto> Handle(DeleteUserFromBotCommand request, CancellationToken cancellationToken)
        {
            var currentUser = await _userRepository
                .GetAll()
                .Where(x => x.TelegramChatId == request.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentUser == null)
            {
                return new SimpleResponseDto
                {
                    IsSuccessful = false,
                };
            }

            await _userRepository.UpdateAsync(x => x.Id == currentUser.Id, x => new User { TelegramChatId = null }, cancellationToken);

            string newSecretKey = SecretKeyGenerator.GenerateSecretKey();

            await _userRepository.UpdateAsync(x => x.Id == currentUser.Id, x => new User { SecretKey = newSecretKey }, cancellationToken);

            return new SimpleResponseDto
            {
                IsSuccessful = true,
                Message = $"Аккаунт в боте был удален. Секретный ключ перегенерирован."
            };
        }
    }
}
