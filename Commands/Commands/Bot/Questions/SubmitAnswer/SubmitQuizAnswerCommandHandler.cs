using AutoMapper;
using Core.Domain.Entities;
using Core.Repositories.GenericRepository;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Commands.Commands.Bot.Questions.SubmitAnswer
{
    public class SubmitQuizAnswerCommandHandler(
        IUserRepository userRepository,
        IMapper mapper,
        IGenericRepository<Question> questionsRepository,
        IGenericRepository<Answer> answersRepository)
    : IRequestHandler<SubmitQuizAnswerCommand, SubmittedQuizAnswerDto>
    {
        public async Task<SubmittedQuizAnswerDto> Handle(SubmitQuizAnswerCommand request, CancellationToken cancellationToken)
        {
            var response = new SubmittedQuizAnswerDto();

            var user = await userRepository
                .GetAll()
                .Where(u => u.TelegramChatId == request.TelegramChatId)
                .FirstOrDefaultAsync(cancellationToken);

            var question = await questionsRepository
                .GetAll()
                .Where(u => u.Id == request.QuestionId)
                .FirstOrDefaultAsync(cancellationToken);

            var answer = new Answer
            {
                Id = Guid.NewGuid(),
                UserId = user.Id,
                QuestionId = request.QuestionId,
                UserAnswer = request.Answer,
                IsCorrect = question.CorrectAnswer == request.Answer,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = $"{user.FirstName} {user.LastName}"
            };

            await answersRepository.AddAsync(answer);

            var hasNextQuestion = await questionsRepository
                .GetAll()
                .Where(q => !q.Answers.Any(a => a.UserId == user.Id))
                .AnyAsync(cancellationToken);

            response.HasNextQuestion = hasNextQuestion;

            response.IsCorrect = question.CorrectAnswer == request.Answer;

            if (!response.IsCorrect)
            {
                response.CorrectAnswer = question.CorrectAnswer;
            }

            return response;
        }
    }
}
