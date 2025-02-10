namespace Core.Domain.Entities
{
    public class Answer : BaseEntity
    {
        public required string UserAnswer { get; set; }
        public bool IsCorrect { get; set; }
        public Guid UserId { get; set; }
        public Guid QuestionId { get; set; }

        public User User { get; set; }
        public Question Question { get; set; }
    }
}
