namespace Queries.DTOs
{
    public class QuestionViewDto
    {
        public bool IsCorrect { get; set; }
        public string? Image { get; set; }
        public string Text { get; set; }
        public IList<string>? Topics { get; set; }
        public string UserAnswer { get; set; }
        public string CorrectAnswer { get; set; }
    }
}
