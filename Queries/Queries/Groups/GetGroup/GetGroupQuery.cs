using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Groups.GetGroup
{
    public class GetGroupQuery : IRequest<GroupDto>
    {
        public Guid Id { get; set; }
    }
}
