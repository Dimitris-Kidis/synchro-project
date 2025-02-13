using Commands.Commands.Requests.CreateRequest;
using Commands.Commands.Requests.DeleteRequest;
using Commands.Commands.Requests.UpdateRequest;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Synchro.Controllers.Requests
{
    [Route("api/request")]
    [ApiController]
    public class RequestsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create request
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateRequest([FromBody] CreateRequestCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        /// <summary>
        /// Update request
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateRequest([FromBody] UpdateRequestCommand command)
        {
            await _mediator.Send(command);

            return NoContent();
        }

        /// <summary>
        /// Delete request
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(Guid id)
        {
            await _mediator.Send(new DeleteRequestCommand { Id = id });

            return Ok();
        }
    }
}
