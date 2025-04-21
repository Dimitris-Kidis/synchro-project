using Commands.Commands.Bot.Common.DTOs;
using MediatR;

namespace Commands.Commands.Bot.Avatar.DeleteAvatar
{
    public class DeleteAvatarFromBotCommand : IRequest<SimpleResponseDto>
    {
        public long TelegramChatId { get; set; }
    }
}
