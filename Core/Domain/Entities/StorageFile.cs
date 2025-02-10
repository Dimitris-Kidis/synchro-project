using static Common.Enums.DocumentTypeEnum;

namespace Core.Domain.Entities
{
    public class StorageFile : BaseEntity
    {
        public required string FileName { get; set; }
        public DocumentType Type { get; set; }
        public required string Size { get; set; }
        public required string Link { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
