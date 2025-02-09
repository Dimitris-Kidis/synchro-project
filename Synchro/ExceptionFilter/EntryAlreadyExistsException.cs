using System.Net;

namespace Synchro.ExceptionFilter
{
    public class EntryAlreadyExistsException(string message) : ApiException(HttpStatusCode.BadRequest, message)
    {
    }
}
