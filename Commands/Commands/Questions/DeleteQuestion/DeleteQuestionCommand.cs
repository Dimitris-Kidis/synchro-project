using MediatR;

namespace Commands.Commands.Questions.DeleteQuestion
{
    public class DeleteQuestionCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}
