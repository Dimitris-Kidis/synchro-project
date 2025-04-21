using Commands.Commands.Bot.Common.DTOs;
using MediatR;

namespace Commands.Commands.Bot.Auth.Delete
{
    public class DeleteUserFromBotCommand : IRequest<SimpleResponseDto>
    {
        public long TelegramChatId { get; set; }
    }
}
