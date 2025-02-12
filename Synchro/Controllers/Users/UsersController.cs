using Commands.Commands.Users.UpdateUserRole;
using Core.Providers.CurrentUserProvider;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.User.GetUser;

namespace Synchro.Controllers.Users
{
    [Route("api/user")]
    [ApiController]
    public class UsersController(
       IMediator mediator,
       ICurrentUserProvider currentUserProvider) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;
        private readonly ICurrentUserProvider _currentUserProvider = currentUserProvider;

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var result = await _mediator.Send(new GetUserQuery { Id = id });

            return Ok(result);
        }

        [HttpGet("me")]
        public async Task<IActionResult> GetCurrentUser()
        {
            Guid? currentUserId = _currentUserProvider.GetCurrentUserId();

            if (currentUserId == null || !currentUserId.HasValue)
            {
                return NotFound("User not found");
            }

            var result = await _mediator.Send(new GetUserQuery { Id = currentUserId.Value });

            return Ok(result);
        }

        [HttpPut("role")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRoleCommand command)
        {
            await _mediator.Send(command);

            return NoContent();
        }
    }
}
