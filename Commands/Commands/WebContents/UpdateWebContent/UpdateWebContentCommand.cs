using MediatR;
using static Common.Enums.AudienceTypeEnum;

namespace Commands.Commands.WebContents.UpdateWebContent
{
    public class UpdateWebContentCommand : IRequest
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public AudienceType AudienceType { get; set; }
        public string Image { get; set; }
        public bool IsAuthorVisible { get; set; }
        public IList<string> Links { get; set; } = [];
    }
}
