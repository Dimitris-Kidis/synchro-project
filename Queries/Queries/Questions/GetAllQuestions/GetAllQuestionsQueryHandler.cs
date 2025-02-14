using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Questions.GetAllQuestions
{
    public class GetAllQuestionsQueryHandler(
    ISynchroRepository<Question> questionRepository,
    IMapper mapper) : IRequestHandler<GetAllQuestionsQuery, IEnumerable<QuestionDto>>
    {
        private readonly ISynchroRepository<Question> questionRepository = questionRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<QuestionDto>> Handle(GetAllQuestionsQuery request, CancellationToken cancellationToken)
        {
            return await questionRepository
                .GetAll()
                .ProjectTo<QuestionDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}
