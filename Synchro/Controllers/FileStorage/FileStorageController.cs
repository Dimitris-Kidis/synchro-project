using Commands.Commands.FileStorage.AddFile;
using Commands.Commands.FileStorage.DeleteFile;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Queries.Queries.FileStorage.GetAllFilesForGroup;

namespace Synchro.Controllers.FileStorage
{
    [Route("api/storage")]
    [ApiController]
    public class FileStorageController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        /// <summary>
        /// Create file storage
        /// </summary>
        [HttpPost("")]
        public async Task<IActionResult> CreateFileStorage([FromBody] AddStorageFileCommand command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        /// <summary>
        /// Delete file storage
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFileStorage(Guid id)
        {
            await _mediator.Send(new DeleteStorageFileCommand { Id = id });

            return Ok();
        }

        /// <summary>
        /// Get all files for group
        /// </summary>
        [HttpGet("all/{groupId}")]
        public async Task<IActionResult> GetAllFilesForGroup(Guid groupId)
        {
            var result = await _mediator.Send(new GetAllFilesForGroupQuery { Id = groupId });

            return Ok(result);
        }
    }
}
