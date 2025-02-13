using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Questions.DeleteQuestion
{
    public class DeleteQuestionCommandHandler(
        ISynchroRepository<Question> questionRepository,
        IEntityValidatorService<Question> questionValidator
    ) : IRequestHandler<DeleteQuestionCommand>
    {
        private readonly ISynchroRepository<Question> questionRepository = questionRepository;
        private readonly IEntityValidatorService<Question> questionValidator = questionValidator;

        public async Task Handle(DeleteQuestionCommand request, CancellationToken cancellationToken)
        {
            await questionValidator.EntityExistsAsync(request.Id, cancellationToken);
            Question question = await questionRepository.GetByIdAsync(request.Id, cancellationToken);
            await questionRepository.DeleteAsync(question, cancellationToken);
        }
    }
}
