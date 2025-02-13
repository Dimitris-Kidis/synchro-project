using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Groups.GetGroupPeople
{
    public class GetGroupPeopleQuery : IRequest<IEnumerable<GroupUserDto>>
    {
        public Guid Id { get; set; }
    }
}
