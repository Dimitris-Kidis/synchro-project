using static Common.Enums.DocumentTypeEnum;

namespace Queries.DTOs
{
    public class StorageFileDto
    {
        public Guid Id { get; set; }
        public required string FileName { get; set; }
        public DocumentType Type { get; set; }
        public required string Size { get; set; }
        public required string Link { get; set; }
        public Guid GroupId { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
    }
}
