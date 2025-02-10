using static Common.Enums.DocumentTypeEnum;

namespace Core.Domain.Entities
{
    public class StorageFile : BaseEntity
    {
        public string FileName { get; set; }
        public DocumentType Type { get; set; }
        public string Size { get; set; }
        public string Link { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
