namespace Core.Domain.Entities
{
    public class Question : BaseEntity
    {
        public string? Text { get; set; }
        public required IList<string> Options { get; set; }
        public string? Image { get; set; }
        public IList<string>? Topics { get; set; }
        public required string CorrectAnswer { get; set; }
        public ICollection<Answer> Answers { get; set; } = [];
    }
}
