using Commands.Commands.WebContents.CreateWebContent;
using Commands.Commands.WebContents.DeleteWebContent;
using Commands.Commands.WebContents.UpdateWebContent;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Synchro.Controllers.WebContents
{
    [Route("api/web-content")]
    [ApiController]
    public class WebContentController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create web content
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateWebContent([FromBody] CreateWebContentCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        /// <summary>
        /// Update web content
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateWebContent([FromBody] UpdateWebContentCommand command)
        {
            await _mediator.Send(command);

            return NoContent();
        }

        /// <summary>
        /// Delete web content
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWebContent(Guid id)
        {
            await _mediator.Send(new DeleteWebContentCommand { Id = id });

            return Ok();
        }
    }
}
