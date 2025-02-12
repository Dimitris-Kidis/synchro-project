using Core.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace Core.Domain.Entities
{
    public class Answer : IBaseEntity
    {
        public Guid Id { get; set; }
        public required string UserAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public Guid UserId { get; set; }
        public Guid QuestionId { get; set; }

        public User User { get; set; }
        public Question Question { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
