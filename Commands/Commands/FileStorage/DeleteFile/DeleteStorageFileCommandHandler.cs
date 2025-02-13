using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.FileStorage.DeleteFile
{
    public class DeleteFileStorageCommandHandler(
        ISynchroRepository<StorageFile> fileStorageRepository,
        IEntityValidatorService<StorageFile> fileStorageValidator
        ) : IRequestHandler<DeleteStorageFileCommand>
    {
        private readonly ISynchroRepository<StorageFile> fileStorageRepository = fileStorageRepository;
        private readonly IEntityValidatorService<StorageFile> fileStorageValidator = fileStorageValidator;

        public async Task Handle(DeleteStorageFileCommand request, CancellationToken cancellationToken)
        {
            await fileStorageValidator.EntityExistsAsync(request.Id, cancellationToken);

            StorageFile fileStorage = await fileStorageRepository.GetByIdAsync(request.Id, cancellationToken);

            await fileStorageRepository.DeleteAsync(fileStorage, cancellationToken);
        }
    }
}
