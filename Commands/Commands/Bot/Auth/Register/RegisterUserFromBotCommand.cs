using Commands.Commands.Bot.Common.DTOs;
using MediatR;

namespace Commands.Commands.Bot.Auth.Register
{
    public class RegisterUserFromBotCommand : IRequest<SimpleResponseDto>
    {
        public required string SecretKey { get; set; }
        public required long TelegramChatId { get; set; }
    }
}
