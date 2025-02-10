using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class BaseEntity
    {
        public Guid Id { get; set; }
        public string CreatedBy { get; set; } = null!;
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
