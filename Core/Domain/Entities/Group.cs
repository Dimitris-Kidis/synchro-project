using Core.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class Group : IBaseEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Image { get; set; }
        public bool CanJoin { get; set; }
        public bool HasManager { get; set; }
        public bool IsApprovedToBeCreated { get; set; }
        public bool IsDeleted { get; set; }
        public int ParticipantsNumber { get; set; }
        public int ParticipantsLimitNumber { get; set; }
        public ICollection<User> Users { get; set; } = [];
        public ICollection<CalendarEvent> CalendarEvents { get; set; } = [];
        public ICollection<WikiPage> WikiPages { get; set; } = [];
        public ICollection<StorageFile> StorageFiles { get; set; } = [];
        public ICollection<Request> Requests { get; set; } = [];
        public ICollection<WorkItem> WorkItems { get; set; } = [];
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
