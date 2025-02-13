using Commands.Commands.Attachments.DeleteAttachment;
using Commands.Commands.Attachments.UploadAttachment;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Synchro.Controllers.Attachments
{
    [Route("api/attachment")]
    [ApiController]
    public class AttachmentsController(
    IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost("")]
        public async Task<IActionResult> UploadAttachment([FromForm] UploadAttachmentCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        [HttpDelete("")]
        public async Task<IActionResult> DeleteAttachment([FromBody] DeleteAttachmentCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }
    }
}
