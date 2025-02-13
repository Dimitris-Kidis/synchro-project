using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Repositories.UserRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.Queries.DTOs;

namespace Queries.Queries.User.GetUsersPaginated
{
    public class GetUsersPaginatedQueryHandler(
    IUserRepository userRepository,
    IMapper mapper) : IRequestHandler<GetUsersPaginatedQuery, PaginatorResult<UserPaginatedDto>>
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<UserPaginatedDto>> Handle(GetUsersPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = _userRepository.GetAll();

            if (!string.IsNullOrWhiteSpace(request.SearchInput))
            {
                string search = request.SearchInput.Trim().ToLower();
                query = query.Where(u =>
                    u.Email.ToLower().Contains(search) ||
                    u.FirstName.ToLower().Contains(search) ||
                    u.LastName.ToLower().Contains(search));
            }

            int total = await query.CountAsync(cancellationToken);

            bool hasMore = (request.PaginatedRequest.PageIndex + 1) * request.PaginatedRequest.PageSize < total;

            var users = await query
                .OrderBy(u => u.Id)
                .Skip((request.PaginatedRequest.PageIndex - 1) * request.PaginatedRequest.PageSize)
                .Take(request.PaginatedRequest.PageSize)
                .ProjectTo<UserPaginatedDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<UserPaginatedDto>
            {
                Items = users,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}
