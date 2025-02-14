using Common.Pagination;
using MediatR;
using Queries.DTOs;

namespace Queries.Queries.WebContents.GetWebContentsPaginated
{
    public class GetWebContentsPaginatedQuery : IRequest<PaginatorResult<WebContentDto>>
    {
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
