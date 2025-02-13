using MediatR;
using Microsoft.AspNetCore.Http;
using static Common.Enums.DocumentTypeEnum;

namespace Commands.Commands.Attachments.UploadAttachment
{
    public class UploadAttachmentCommand : IRequest<string>
    {
        public IFormFile File { get; set; }
        public string Size { get; set; }
        public DocumentType Type { get; set; }
    }
}
