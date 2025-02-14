using MediatR;
using Queries.DTOs;

namespace Queries.Queries.FileStorage.GetAllFilesForGroup
{
    public class GetAllFilesForGroupQuery : IRequest<IEnumerable<StorageFileDto>>
    {
        public Guid Id { get; set; }
    }
}
