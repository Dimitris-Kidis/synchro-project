using Commands.Commands.Wikis.CreateWikiPage;
using Commands.Commands.Wikis.DeleteWikiPage;
using Commands.Commands.Wikis.UpdateWIkiPage;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.WikiPages.GetWikiPagesPaginated;

namespace Synchro.Controllers.WikiPages
{

    [Route("api/wiki")]
    [ApiController]
    public class WikiPagesController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create wiki page
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateWikiPage([FromBody] CreateWikiPageCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        /// <summary>
        /// Update wiki page
        /// </summary>
        [HttpPut("")]
        public async Task<IActionResult> UpdateWikiPage([FromBody] UpdateWikiPageCommand command)
        {
            await _mediator.Send(command);

            return NoContent();
        }

        /// <summary>
        /// Delete wiki page
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWikiPage(Guid id)
        {
            await _mediator.Send(new DeleteWikiPageCommand { Id = id });

            return Ok();
        }

        /// <summary>
        /// Get wiki pages paginated
        /// </summary>
        [HttpPost("paginated")]
        public async Task<IActionResult> GetWikiPagesPaginated([FromBody] GetWikiPagesPaginatedQuery query)
        {
            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
