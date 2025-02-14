using Commands.Commands.CalendarEvents.CreateCalendarEvent;
using Commands.Commands.CalendarEvents.DeleteCalendarEvent;
using Commands.Commands.CalendarEvents.UpdateCalendarEvent;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.CalendarEvents.GetCalendarEvent;
using Queries.Queries.CalendarEvents.GetCalendarEvents;

namespace Synchro.Controllers.CalendarEvents
{
    [Route("api/calendar-events")]
    [ApiController]
    public class CalendarEventsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create calendar event
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateCalendarEvent([FromBody] CreateCalendarEventCommand command)
        {
            await _mediator.Send(command);
            return Ok();
        }

        /// <summary>
        /// Update calendar event
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateCalendarEvent([FromBody] UpdateCalendarEventCommand command)
        {
            await _mediator.Send(command);
            return NoContent();
        }

        /// <summary>
        /// Delete calendar event
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCalendarEvent(Guid id)
        {
            await _mediator.Send(new DeleteCalendarEventCommand { Id = id });
            return Ok();
        }

        /// <summary>
        /// Get calendar event
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCalendarEvent(Guid id)
        {
            var result = await _mediator.Send(new GetCalendarEventQuery { Id = id });

            return Ok(result);
        }

        /// <summary>
        /// Get calendar events
        /// </summary>
        [HttpGet("group/{groupId}")]
        public async Task<IActionResult> GetCalendarEvents(Guid groupId)
        {
            var result = await _mediator.Send(new GetCalendarEventsQuery { Id = groupId });

            return Ok(result);
        }
    }
}
