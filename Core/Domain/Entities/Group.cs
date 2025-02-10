namespace Core.Domain.Entities
{
    public class Group : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public bool CanJoin { get; set; }
        public bool HasManager { get; set; }
        public bool IsApprovedToBeCreated { get; set; }
        public bool IsDeleted { get; set; }
        public int ParticipantsNumber { get; set; }
        public int ParticipantsLimitNumber { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<CalendarEvent> CalendarEvents { get; set; }
        public ICollection<WikiPage> WikiPages { get; set; }
        public ICollection<StorageFile> StorageFiles { get; set; }
        public ICollection<Request> Requests { get; set; }
    }
}
