using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using static Common.Enums.RoleTypeEnum;

namespace Core.Domain.Entities
{
    public class User : IdentityUser<Guid>, IBaseEntity
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string? Image { get; set; }
        public string? SecretKey { get; set; }
        public long? TelegramChatId { get; set; }
        public RoleType Role { get; set; }
        public Guid? GroupId { get; set; }
        public Group Group { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
        public ICollection<WebContent> WebContents { get; set; } = [];
        public ICollection<Request> Requests { get; set; } = [];
        public ICollection<WorkItem> WorkItems { get; set; } = [];
    }
}