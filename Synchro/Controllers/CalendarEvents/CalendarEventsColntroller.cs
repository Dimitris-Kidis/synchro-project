using Commands.Commands.CalendarEvents.CreateCalendarEvent;
using Commands.Commands.CalendarEvents.DeleteCalendarEvent;
using Commands.Commands.CalendarEvents.UpdateCalendarEvent;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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
    }
}
