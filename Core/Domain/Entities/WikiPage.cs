namespace Core.Domain.Entities
{
    public class WikiPage : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public IList<string> Tags { get; set; } = [];
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
