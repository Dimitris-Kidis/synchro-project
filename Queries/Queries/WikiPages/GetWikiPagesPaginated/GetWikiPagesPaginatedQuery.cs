using Common.Pagination;
using MediatR;
using Queries.DTOs;

namespace Queries.Queries.WikiPages.GetWikiPagesPaginated
{
    public class GetWikiPagesPaginatedQuery : IRequest<PaginatorResult<WikiPageDto>>
    {
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
