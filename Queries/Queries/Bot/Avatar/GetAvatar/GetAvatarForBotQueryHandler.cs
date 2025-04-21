using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.Queries.Bot.Common.DTOs;

namespace Queries.Queries.Bot.Avatar.GetAvatar
{
    public class GetAvatarForBotQueryHandler(
        IUserRepository userRepository
        ) : IRequestHandler<GetAvatarForBotQuery, SimpleResponseDto>
    {
        private readonly IUserRepository _userRepository = userRepository;

        public async Task<SimpleResponseDto> Handle(GetAvatarForBotQuery request, CancellationToken cancellationToken)
        {
            var currentUser = await _userRepository
                .GetAll()
                .AsNoTracking()
                .Where(x => x.TelegramChatId == request.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentUser == null)
            {
                return new SimpleResponseDto
                {
                    IsSuccessful = false,
                };
            }

            return new SimpleResponseDto
            {
                IsSuccessful = true,
                Message = currentUser.Image == null ? $"Аватар отсутствует." : null,
                Url = currentUser.Image != null ? currentUser.Image : null,
            };
        }
    }
}
