using Core.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class WikiPage : IBaseEntity
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public string? Content { get; set; }
        public IList<string>? Tags { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
