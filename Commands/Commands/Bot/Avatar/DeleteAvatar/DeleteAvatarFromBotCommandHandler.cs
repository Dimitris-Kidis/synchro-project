using Commands.Commands.Bot.Common.DTOs;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Bot.Avatar.DeleteAvatar
{
    public class DeleteAvatarFromBotCommandHandler(
        IUserRepository userRepository
        ) : IRequestHandler<DeleteAvatarFromBotCommand, SimpleResponseDto>
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<SimpleResponseDto> Handle(DeleteAvatarFromBotCommand request, CancellationToken cancellationToken)
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

            await _userRepository.UpdateAsync(x => x.Id == currentUser.Id, x => new User { Image = null }, cancellationToken);

            return new SimpleResponseDto
            {
                IsSuccessful = true,
                Message = $"Аватар успешно удален."
            };
        }
    }
}
