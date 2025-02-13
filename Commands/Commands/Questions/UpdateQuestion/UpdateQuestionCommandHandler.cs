using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using Core.Services.EntityValidator;
using MediatR;

namespace Commands.Commands.Questions.UpdateQuestion
{
    public class UpdateQuestionCommandHandler(
        ISynchroRepository<Question> questionRepository,
        IEntityValidatorService<Question> questionValidator,
        IMapper mapper
    ) : IRequestHandler<UpdateQuestionCommand>
    {
        private readonly ISynchroRepository<Question> questionRepository = questionRepository;
        private readonly IEntityValidatorService<Question> questionValidator = questionValidator;
        private readonly IMapper mapper = mapper;

        public async Task Handle(UpdateQuestionCommand request, CancellationToken cancellationToken)
        {
            await questionValidator.EntityExistsAsync(request.Id, cancellationToken);
            var question = await questionRepository.GetByIdAsync(request.Id, cancellationToken);
            mapper.Map(request, question);
            await questionRepository.UpdateAsync(question, cancellationToken);
        }
    }
}
