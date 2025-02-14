using static Common.Enums.AudienceTypeEnum;

namespace Queries.DTOs
{
    public class WebContentDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public AudienceType AudienceType { get; set; }
        public string Image { get; set; }
        public bool IsAuthorVisible { get; set; }
        public IList<string> Links { get; set; } = [];
        public string Author { get; set; }
        public Guid UserId { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
    }
}
