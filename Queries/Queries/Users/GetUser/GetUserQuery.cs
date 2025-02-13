using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Users.GetUser
{
    public class GetUserQuery : IRequest<UserDto>
    {
        public Guid Id { get; set; }
    }
}
