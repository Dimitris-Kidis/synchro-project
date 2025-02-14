using MediatR;
using Queries.DTOs;

namespace Queries.Queries.Requests.GetMyRequests
{
    public class GetMyRequestsQuery : IRequest<IEnumerable<RequestDto>>
    {
    }
}
