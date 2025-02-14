namespace Queries.DTOs
{
    public class QuestionDto
    {
        public Guid Id { get; set; }
        public string? Text { get; set; }
        public required IList<string> Options { get; set; }
        public string? Image { get; set; }
        public IList<string>? Topics { get; set; }
        public required string CorrectAnswer { get; set; }
        public string CreatedBy { get; set; }
        public string? LastModifiedBy { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset? LastModifiedAt { get; set; }
    }
}
