using MediatR;
using static Common.Enums.DocumentTypeEnum;

namespace Commands.Commands.FileStorage.AddFile
{
    public class AddStorageFileCommand : IRequest
    {
        public required string FileName { get; set; }
        public DocumentType Type { get; set; }
        public required string Size { get; set; }
        public required string Link { get; set; }
    }
}
