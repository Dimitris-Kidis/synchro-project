using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using Core.Repositories.UserRepository;
using Core.Services.EntityValidator;
using MediatR;
using static Common.Enums.DocumentTypeEnum;

namespace Commands.Commands.Attachments.DeleteAttachment
{
    public class DeleteAttachmentCommandHandler(
        ICurrentUserProvider currentUserProvider,
        IUserRepository userRepository,
        ISynchroRepository<Group> groupRepository,
        IEntityValidatorService<User> userValidator,
        IEntityValidatorService<Group> groupValidator
        ) : IRequestHandler<DeleteAttachmentCommand>
    {
        private readonly ICurrentUserProvider _currentUserProvider = currentUserProvider;
        private readonly IEntityValidatorService<User> _userValidator = userValidator;
        private readonly IEntityValidatorService<Group> _groupValidator = groupValidator;
        private readonly IUserRepository _userRepository = userRepository;
        private readonly ISynchroRepository<Group> _groupRepository = groupRepository;

        public async Task Handle(DeleteAttachmentCommand command, CancellationToken cancellationToken)
        {
            switch (command.Type)
            {
                case DocumentType.UserAvatar:
                    Guid? currentUserId = _currentUserProvider.GetCurrentUserId();

                    if (currentUserId == null)
                    {
                        throw new BusinessValidationException("User not found");
                    }

                    await _userValidator.EntityExistsAsync(currentUserId.Value, cancellationToken);

                    await _userRepository.UpdateAsync(x => x.Id == currentUserId, x => new User { Image = null }, cancellationToken);
                    break;
                case DocumentType.GroupAvatar:
                    Guid? currentUserGroupId = await _currentUserProvider.GetCurrentUserGroupIdAsync();

                    if (currentUserGroupId == null)
                    {
                        throw new BusinessValidationException("Group not found");
                    }

                    await _groupValidator.EntityExistsAsync(currentUserGroupId.Value, cancellationToken);

                    await _groupRepository.UpdateAsync(x => x.Id == currentUserGroupId, x => new Group { Image = null }, cancellationToken);
                    break;
                default:
                    throw new BusinessValidationException("Unknown Document Type. Please provide an existing one...");
            }
        }
    }
}
