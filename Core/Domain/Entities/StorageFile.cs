using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using static Common.Enums.DocumentTypeEnum;

namespace Core.Domain.Entities
{
    public class StorageFile : IBaseEntity
    {
        public Guid Id { get; set; }
        public required string FileName { get; set; }
        public DocumentType Type { get; set; }
        public required string Size { get; set; }
        public required string Link { get; set; }
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
