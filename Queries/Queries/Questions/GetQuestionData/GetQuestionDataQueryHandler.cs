using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Exceptions;
using Core.Domain.Entities;
using Core.Providers.CurrentUserProvider;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Questions.GetQuestionData
{
    public class GetQuestionDataQueryHandler(
        ISynchroRepository<Question> questionRepository,
        ISynchroRepository<Answer> answerRepository,
        ICurrentUserProvider currentUserProvider,
        IMapper mapper) : IRequestHandler<GetQuestionDataQuery, QuestionsWebDataDto>
    {
        private readonly ISynchroRepository<Question> questionRepository = questionRepository;
        private readonly ISynchroRepository<Answer> answerRepository = answerRepository;
        private readonly ICurrentUserProvider currentUserProvider = currentUserProvider;
        private readonly IMapper _mapper = mapper;

        public async Task<QuestionsWebDataDto> Handle(GetQuestionDataQuery request, CancellationToken cancellationToken)
        {
            Guid? userId = currentUserProvider.GetCurrentUserId();

            if (userId == null)
            {
                throw new BusinessValidationException("User not found");
            }

            var answeredQuestionsCount = await answerRepository
                .GetAll()
                .Where(a => a.UserId == userId)
                .Select(a => a.QuestionId)
                .CountAsync(cancellationToken);

            var correctlyAnsweredQuestionsCount = await answerRepository
                .GetAll()
                .Where(a => a.UserId == userId && a.IsCorrect == true)
                .Select(a => a.QuestionId)
                .CountAsync(cancellationToken);

            var totalQuestionsCount = await questionRepository
                .GetAll()
                .CountAsync(cancellationToken);

            var topicsToLearn = await answerRepository
                .GetAll()
                .Include(a => a.Question)
                .Where(a => a.UserId == userId && a.IsCorrect != true && a.Question.Topics != null)
                .Select(a => a.Question.Topics)
                .ToListAsync(cancellationToken);

            var correctlyAnsweredQuestionsPercentage = correctlyAnsweredQuestionsCount / totalQuestionsCount * 100;

            var questions = await questionRepository
                .GetAll()
                .ProjectTo<QuestionViewDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new QuestionsWebDataDto
            {
                AnsweredQuestionsCount = answeredQuestionsCount,
                CorrectlyAnsweredQuestionsCount = correctlyAnsweredQuestionsCount,
                CorrectlyAnsweredQuestionsPercentage = correctlyAnsweredQuestionsPercentage,
                TotalQuestionsCount = totalQuestionsCount,
                Questions = questions
            };
        }
    }
}
