using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.WebContents.GetWebContentsPaginated
{
    public class GetWebContentsPaginatedQueryHandler(
    ISynchroRepository<WebContent> webContentRepository,
    IMapper mapper) : IRequestHandler<GetWebContentsPaginatedQuery, PaginatorResult<WebContentDto>>
    {
        private readonly ISynchroRepository<WebContent> webContentRepository = webContentRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<WebContentDto>> Handle(GetWebContentsPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = webContentRepository.GetAll();

            if (!string.IsNullOrWhiteSpace(request.SearchInput))
            {
                string search = request.SearchInput.Trim().ToLower();
                query = query.Where(u =>
                    u.Title.ToLower().Contains(search) ||
                    u.Content.ToLower().Contains(search));
            }

            int total = await query.CountAsync(cancellationToken);

            bool hasMore = (request.PaginatedRequest.PageIndex + 1) * request.PaginatedRequest.PageSize < total;

            var wikiPages = await query
                .OrderBy(u => u.Id)
                .Skip((request.PaginatedRequest.PageIndex - 1) * request.PaginatedRequest.PageSize)
                .Take(request.PaginatedRequest.PageSize)
                .ProjectTo<WebContentDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<WebContentDto>
            {
                Items = wikiPages,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}
