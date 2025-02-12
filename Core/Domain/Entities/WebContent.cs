using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using static Common.Enums.AudienceTypeEnum;

namespace Core.Domain.Entities
{
    public class WebContent : IBaseEntity
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
        public User User { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
