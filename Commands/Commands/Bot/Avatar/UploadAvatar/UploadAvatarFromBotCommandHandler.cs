using Commands.Commands.Bot.Common.DTOs;
using Core.Domain.Entities;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Commands.Commands.Bot.Avatar.UploadAvatar
{
    public class UploadAvatarFromBotCommandHandler(
        IUserRepository userRepository,
        IConfiguration configuration
        ) : IRequestHandler<UploadAvatarFromBotCommand, SimpleResponseDto>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly string azureBlobStorageConnectionString = configuration.GetConnectionString("AzureBlobStorage")
            ?? throw new InvalidOperationException("Azure Blob Storage connection string is missing in configuration.");

        public async Task<SimpleResponseDto> Handle(UploadAvatarFromBotCommand command, CancellationToken cancellationToken)
        {
            string systemFileName = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-dd") + DateTime.Now.ToUniversalTime().ToString("THHmmssfff") + "." + command.File.FileName;

            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(azureBlobStorageConnectionString);
            CloudBlobClient blobClient = cloudStorageAccount.CreateCloudBlobClient();
            CloudBlobContainer container = blobClient.GetContainerReference("avatars");
            CloudBlockBlob blockBlob = container.GetBlockBlobReference(systemFileName);

            await using (var data = command.File.OpenReadStream())
            {
                await blockBlob.UploadFromStreamAsync(data);
            }

            string finalUrl = $"{container.Uri.AbsoluteUri + "/" + systemFileName}";

            var currentUser = await _userRepository
                .GetAll()
                .Where(x => x.TelegramChatId == command.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            if (currentUser == null)
            {
                return new SimpleResponseDto
                {
                    IsSuccessful = false,
                };
            }

            await _userRepository.UpdateAsync(x => x.Id == currentUser.Id, x => new User { Image = finalUrl }, cancellationToken);

            return new SimpleResponseDto
            {
                IsSuccessful = true,
                Message = $"Аватар успешно загружен."
            };
        }
    }
}
