using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

namespace Synchro.Hub
{
    public interface IChatClient
    {
        Task ReceiveMessage(string userName, string message, string userId);
        Task JoinedToChat(string userName);
        Task UserLeft(string userName);
    }

    public record UserConnection(string ConnectionId, string UserName, string UserId);

    public class ChatHub : Hub<IChatClient>
    {
        private static readonly ConcurrentDictionary<string, UserConnection> _connections = new();

        public async Task JoinChatAsync(string userName, string userId)
        {
            var connectionId = Context.ConnectionId;
            var userConnection = new UserConnection(connectionId, userName, userId);

            _connections[connectionId] = userConnection;

            await Clients.Others.JoinedToChat(userName);
        }

        public async Task SendMessageAsync(string userId, string userName, string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out var userConnection))
            {
                await Clients.All.ReceiveMessage(userName, message, userId);
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
