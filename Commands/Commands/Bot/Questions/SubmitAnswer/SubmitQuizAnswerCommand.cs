using MediatR;

namespace Commands.Commands.Bot.Questions.SubmitAnswer
{
    public class SubmitQuizAnswerCommand : IRequest<SubmittedQuizAnswerDto>
    {
        public long TelegramChatId { get; set; }
        public string Answer { get; set; }
        public Guid QuestionId { get; set; }
    }
}
