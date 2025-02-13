using MediatR;

namespace Commands.Commands.Questions.CreateQuestion
{
    public class CreateQuestionCommand : IRequest
    {
        public string? Text { get; set; }
        public required IList<string> Options { get; set; }
        public string? Image { get; set; }
        public IList<string>? Topics { get; set; }
        public required string CorrectAnswer { get; set; }
    }
}
