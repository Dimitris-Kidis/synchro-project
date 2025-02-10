using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Synchro.Hub
{
    public interface IChatClient
    {
        Task ReceiveMessage(string userName, string message);
        Task UserJoined(string userName);
        Task UserLeft(string userName);
    }

    public record UserConnection(string ConnectionId, string UserName);

    public class ChatHub : Hub<IChatClient>
    {
        private static readonly ConcurrentDictionary<string, UserConnection> _connections = new();

        public async Task JoinChat(string userName)
        {
            var connectionId = Context.ConnectionId;
            var userConnection = new UserConnection(connectionId, userName);

            _connections[connectionId] = userConnection;
            await Clients.Others.UserJoined(userName);
        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                await Clients.All.ReceiveMessage(userConnection.UserName, message);
            }
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            if (_connections.TryRemove(Context.ConnectionId, out var userConnection))
            {
                await Clients.Others.UserLeft(userConnection.UserName);
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
