using System.Net;

namespace Synchro.ExceptionFilter
{
    public class NotFoundException(string message) : ApiException(HttpStatusCode.NotFound, message)
    {
    }
}
