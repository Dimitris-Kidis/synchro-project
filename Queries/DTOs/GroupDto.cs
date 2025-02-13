namespace Queries.DTOs
{
    public class GroupDto
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
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
    }
}
