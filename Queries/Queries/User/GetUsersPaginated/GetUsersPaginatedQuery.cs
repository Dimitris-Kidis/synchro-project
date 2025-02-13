using Common.Pagination;
using MediatR;
using Queries.Queries.DTOs;

namespace Queries.Queries.User.GetUsersPaginated
{
    public class GetUsersPaginatedQuery : IRequest<PaginatorResult<UserPaginatedDto>>
    {
        public string? SearchInput { get; set; }
        public PaginatorRequest PaginatedRequest { get; set; } = new();
    }
}
