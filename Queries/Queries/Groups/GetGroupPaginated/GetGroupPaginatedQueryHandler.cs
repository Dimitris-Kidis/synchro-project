using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.Groups.GetGroupPaginated
{
    public class GetGroupPaginatedQueryHandler(
    ISynchroRepository<Group> groupRepository,
    IMapper mapper) : IRequestHandler<GetGroupPaginatedQuery, PaginatorResult<GroupDto>>
    {
        private readonly ISynchroRepository<Group> groupRepository = groupRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<GroupDto>> Handle(GetGroupPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = groupRepository.GetAll();

            if (!string.IsNullOrWhiteSpace(request.SearchInput))
            {
                string search = request.SearchInput.Trim().ToLower();
                query = query.Where(u =>
                    u.Name.ToLower().Contains(search) ||
                    u.Description.ToLower().Contains(search) ||
                    u.Code.ToLower().Contains(search));
            }

            int total = await query.CountAsync(cancellationToken);

            bool hasMore = (request.PaginatedRequest.PageIndex + 1) * request.PaginatedRequest.PageSize < total;

            var groups = await query
                .OrderBy(u => u.Id)
                .Skip((request.PaginatedRequest.PageIndex - 1) * request.PaginatedRequest.PageSize)
                .Take(request.PaginatedRequest.PageSize)
                .ProjectTo<GroupDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<GroupDto>
            {
                Items = groups,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}
