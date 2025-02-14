namespace Queries.DTOs
{
    public class QuestionsWebDataDto
    {
        public int TotalQuestionsCount { get; set; }
        public int AnsweredQuestionsCount { get; set; }
        public int CorrectlyAnsweredQuestionsCount { get; set; }
        public double CorrectlyAnsweredQuestionsPercentage { get; set; }
        public List<QuestionViewDto> Questions { get; set; }
    }
}
