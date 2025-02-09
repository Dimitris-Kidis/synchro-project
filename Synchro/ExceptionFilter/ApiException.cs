using System.Net;

namespace Synchro.ExceptionFilter
{
    public class ApiException(HttpStatusCode code, string message) : Exception(message)
    {
        public HttpStatusCode Code { get; } = code;
    }
}
