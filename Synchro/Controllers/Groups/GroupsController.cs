using Commands.Commands.Groups.CreateGroup;
using Commands.Commands.Groups.DeleteGroup;
using Commands.Commands.Groups.UpdateGroup;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.Groups.GetGroup;
using Queries.Queries.Groups.GetGroupPaginated;
using Queries.Queries.Groups.GetGroupPeople;

namespace Synchro.Controllers.Groups
{
    [Route("api/group")]
    [ApiController]
    public class GroupsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create group
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupCommand command)
        {
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        /// <summary>
        /// Update group
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateGroup([FromBody] UpdateGroupCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Delete group
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGroup(Guid id)
        {
            await _mediator.Send(new DeleteGroupCommand { Id = id });
            return Ok();
        }

        /// <summary>
        /// Get group
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroup(Guid id)
        {
            var result = await _mediator.Send(new GetGroupQuery { Id = id });
            return Ok(result);
        }

        /// <summary>
        /// Get group people
        /// </summary>
        [HttpGet("{id}/users")]
        public async Task<IActionResult> GetGroupPeople(Guid id)
        {
            var result = await _mediator.Send(new GetGroupPeopleQuery { Id = id });
            return Ok(result);
        }

        /// <summary>
        /// Get groups paginated
        /// </summary>
        [HttpPost("paginated")]
        public async Task<IActionResult> GetGroupsPaginated([FromBody] GetGroupPaginatedQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
