namespace Core.Domain.Entities
{
    public class CalendarEvent : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public IList<string> Links { get; set; }
        public DateTimeOffset StartDateTime { get; set; }
        public DateTimeOffset EndDateTime { get; set; }
        public Guid GroupId { get; set; }
        public Group Group { get; set; }
    }
}
