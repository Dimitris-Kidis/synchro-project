namespace Queries.Queries.Bot.Qustions.GetNextQuestion
{
    public class QuizQuestionDto
    {
        public Guid Id { get; set; }
        public string? Text { get; set; }
        public required IList<string> Options { get; set; }
        public string? Image { get; set; }
        public IList<string>? Topics { get; set; }
        public required string CorrectAnswer { get; set; }
    }
}
