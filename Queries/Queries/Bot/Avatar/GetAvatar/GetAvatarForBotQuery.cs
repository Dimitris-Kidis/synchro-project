using MediatR;
using Queries.Queries.Bot.Common.DTOs;

namespace Queries.Queries.Bot.Avatar.GetAvatar
{
    public class GetAvatarForBotQuery : IRequest<SimpleResponseDto>
    {
        public long TelegramChatId { get; set; }
    }
}
