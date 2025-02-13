using Common.Pagination;
using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Groups.GetGroupPaginated
{
    public class GetGroupPaginatedQuery : IRequest<PaginatorResult<GroupDto>>
    {
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
