using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Pagination;
using Core.Domain.Entities;
using Core.Repositories.SynchroRepository;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Queries.DTOs;

namespace Queries.Queries.WikiPages.GetWikiPagesPaginated
{
    public class GetWikiPagesPaginatedQueryHandler(
        ISynchroRepository<WikiPage> wikiPageRepository,
        IMapper mapper) : IRequestHandler<GetWikiPagesPaginatedQuery, PaginatorResult<WikiPageDto>>
    {
        private readonly ISynchroRepository<WikiPage> wikiPageRepository = wikiPageRepository;
        private readonly IMapper _mapper = mapper;

        public async Task<PaginatorResult<WikiPageDto>> Handle(GetWikiPagesPaginatedQuery request, CancellationToken cancellationToken)
        {
            var query = wikiPageRepository.GetAll();

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
                .ProjectTo<WikiPageDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return new PaginatorResult<WikiPageDto>
            {
                Items = wikiPages,
                Total = total,
                HasMore = hasMore
            };
        }
    }
}
