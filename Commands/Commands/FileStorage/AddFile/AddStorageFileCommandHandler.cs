using AutoMapper;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.FileStorage.AddFile
{
    public class AddStorageFileCommandHandler(
    ISynchroRepository<StorageFile> fileStorageRepository,
    ICurrentUserProvider currentUserProvider,
    IMapper mapper
    ) : IRequestHandler<AddStorageFileCommand>
    {
        private readonly ISynchroRepository<StorageFile> fileStorageRepository = fileStorageRepository;
        private readonly ICurrentUserProvider currentUserProvider = currentUserProvider;
        private readonly IMapper mapper = mapper;

        public async Task Handle(AddStorageFileCommand request, CancellationToken cancellationToken)
        {
            Guid? currentUserGroupId = await currentUserProvider.GetCurrentUserGroupIdAsync();

            if (currentUserGroupId == null)
            {
                throw new BusinessValidationException("User not found");
            }

            var fileStorage = mapper.Map<StorageFile>(request);

            fileStorage.GroupId = currentUserGroupId.Value;

            await fileStorageRepository.AddAsync(fileStorage, cancellationToken);
        }
    }
}
