using MediatR;
using static Common.Enums.DocumentTypeEnum;

namespace Commands.Commands.Attachments.DeleteAttachment
{
    public class DeleteAttachmentCommand : IRequest
    {
        public Guid Id { get; set; }
        public DocumentType Type { get; set; }
    }
}
