namespace Commands.Commands.Bot.Questions.SubmitAnswer
{
    public class SubmittedQuizAnswerDto
    {
        public bool IsCorrect { get; set; }
        public string CorrectAnswer { get; set; }
        public bool HasNextQuestion { get; set; }
    }
}
