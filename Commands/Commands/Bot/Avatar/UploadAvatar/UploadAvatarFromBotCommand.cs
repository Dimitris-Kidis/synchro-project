using Commands.Commands.Bot.Common.DTOs;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Commands.Commands.Bot.Avatar.UploadAvatar
{
    public class UploadAvatarFromBotCommand : IRequest<SimpleResponseDto>
    {
        public IFormFile File { get; set; }
        public string Size { get; set; }
        public long? TelegramChatId { get; set; }
    }
}
