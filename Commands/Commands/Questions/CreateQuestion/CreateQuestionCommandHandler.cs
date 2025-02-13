using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;

namespace Commands.Commands.Questions.CreateQuestion
{
    public class CreateQuestionCommandHandler(
        ISynchroRepository<Question> questionRepository,
        IMapper mapper
    ) : IRequestHandler<CreateQuestionCommand>
    {
        private readonly ISynchroRepository<Question> questionRepository = questionRepository;
        private readonly IMapper mapper = mapper;

        public Task Handle(CreateQuestionCommand request, CancellationToken cancellationToken)
        {
            var question = mapper.Map<Question>(request);
            return questionRepository.AddAsync(question, cancellationToken);
        }
    }
}
