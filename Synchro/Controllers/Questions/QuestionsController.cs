using Commands.Commands.Questions.CreateQuestion;
using Commands.Commands.Questions.DeleteQuestion;
using Commands.Commands.Questions.UpdateQuestion;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.Questions.GetAllQuestions;
using Queries.Queries.Questions.GetQuestionData;

namespace Synchro.Controllers.Questions
{
    [Route("api/question")]
    [ApiController]
    public class QuestionsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create question
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromBody] CreateQuestionCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        /// <summary>
        /// Update question
        /// </summary>
        [HttpPut]
        public async Task<IActionResult> UpdateQuestion([FromBody] UpdateQuestionCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Delete question
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(Guid id)
        {
            await _mediator.Send(new DeleteQuestionCommand { Id = id });
            return Ok();
        }

        /// <summary>
        /// Get questions
        /// </summary>
        [HttpGet("all")]
        public async Task<IActionResult> GetQuestions()
        {
            var result = await _mediator.Send(new GetAllQuestionsQuery());

            return Ok(result);
        }

        /// <summary>
        /// Get questions data
        /// </summary>
        [HttpGet("info")]
        public async Task<IActionResult> GetQuestionsData()
        {
            var result = await _mediator.Send(new GetQuestionDataQuery());

            return Ok(result);
        }
    }
}
