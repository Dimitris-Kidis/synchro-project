using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using Core.Repositories.UserRepository;
using Core.Services.EntityValidator;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using static Common.Enums.DocumentTypeEnum;

namespace Commands.Commands.Attachments.UploadAttachment
{

    public class UploadAttachmentCommandHandler(
        ICurrentUserProvider currentUserProvider,
        IUserRepository userRepository,
        ISynchroRepository<Group> groupRepository,
        IConfiguration configuration,
        IEntityValidatorService<User> userValidator,
        IEntityValidatorService<Group> groupValidator
        ) : IRequestHandler<UploadAttachmentCommand, string>
    {
        private readonly ICurrentUserProvider _currentUserProvider = currentUserProvider;
        private readonly IEntityValidatorService<User> _userValidator = userValidator;
        private readonly IEntityValidatorService<Group> _groupValidator = groupValidator;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly ISynchroRepository<Group> _groupRepository = groupRepository;
        private readonly string azureBlobStorageConnectionString = configuration.GetConnectionString("AzureBlobStorage")
            ?? throw new InvalidOperationException("Azure Blob Storage connection string is missing in configuration.");

        public async Task<string> Handle(UploadAttachmentCommand command, CancellationToken cancellationToken)
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

            switch (command.Type)
            {
                case DocumentType.UserAvatar:
                    Guid? currentUserId = _currentUserProvider.GetCurrentUserId();

                    if (currentUserId == null)
                    {
                        throw new BusinessValidationException("User not found");
                    }

                    await _userValidator.EntityExistsAsync(currentUserId.Value, cancellationToken);

                    await _userRepository.UpdateAsync(x => x.Id == currentUserId, x => new User { Image = finalUrl }, cancellationToken);
                    break;
                case DocumentType.GroupAvatar:
                    Guid? currentUserGroupId = await _currentUserProvider.GetCurrentUserGroupIdAsync();

                    if (currentUserGroupId == null)
                    {
                        throw new BusinessValidationException("Group not found");
                    }

                    await _groupValidator.EntityExistsAsync(currentUserGroupId.Value, cancellationToken);

                    await _groupRepository.UpdateAsync(x => x.Id == currentUserGroupId, x => new Group { Image = finalUrl }, cancellationToken);
                    break;
                default:
                    throw new BusinessValidationException("Unknown Document Type. Please provide an existing one...");
            }

            return finalUrl;
        }
    }
}
