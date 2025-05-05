using Commands.Commands.WorkItems.CreateWorkItem;
using Commands.Commands.WorkItems.DeleteWorkItem;
using Commands.Commands.WorkItems.UpdateWorkItem;
using Commands.Commands.WorkItems.UpdateWorkItemStatus;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.WorkItems.GetMyGroupWorkItems;
using Queries.Queries.WorkItems.GetWorkItem;

namespace Synchro.Controllers.WorkItems
{
    [Route("api/work-items")]
    [ApiController]
    public class WorkItemsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create work item
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateWorkItem([FromBody] CreateWorkItemCommand command)
        {
            var result = await _mediator.Send(command);

            return Ok(result);
        }

        /// <summary>
        /// Update work item
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateWorkItem([FromBody] UpdateWorkItemCommand command)
        {
            await _mediator.Send(command);

            return NoContent();
        }

        /// <summary>
        /// Delete work item
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkItem(Guid id)
        {
            await _mediator.Send(new DeleteWorkItemCommand { Id = id });

            return Ok();
        }

        /// <summary>
        /// Get my group work item
        /// </summary>
        [HttpGet("all/{groupId}")]
        public async Task<IActionResult> GetMyGroupWorkItems(Guid groupId)
        {
            var result = await _mediator.Send(new GetMyGroupWorkItemsQuery { Id = groupId });
            return Ok(result);
        }

        /// <summary>
        /// Get work item
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkItem(Guid id)
        {
            var result = await _mediator.Send(new GetWorkItemQuery { Id = id });

            return Ok(result);
        }

        /// <summary>
        /// Update work item status
        /// </summary>
        [HttpPut("status")]
        public async Task<IActionResult> UpdateWorkItemStatus([FromBody] UpdateWorkItemStatusCommand command)
        {
            await _mediator.Send(command);

            return NoContent();
        }
    }
}
