using MediatR;

namespace Commands.Commands.FileStorage.DeleteFile
{
    public class DeleteStorageFileCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
