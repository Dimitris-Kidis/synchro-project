import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private hubConnection: HubConnection;
  private messagesSubject = new BehaviorSubject<any[]>([]);
  // public messages$ = this.messagesSubject.asObservable();

  public constructor() {
    // this.hubConnection = new signalR.HubConnectionBuilder()
    //   // .configureLogging(signalR.LogLevel.Debug)
    //   .withUrl('http://localhost:7162/chatHub', {
    //     skipNegotiation: true, // skipNegotiation as we specify WebSockets
    //     transport: signalR.HttpTransportType.WebSockets, // force WebSocket transport
    //   })
    //   .build();
    // this.hubConnection
    //   .start()
    //   .then(() => {
    //     console.log('Connection started');
    //   })
    //   .catch((err) => console.log('Error while starting connection: ' + err));
    // this.hubConnection.on('ReceiveMessage', (message: any) => {
    //   this.messagesSubject.next([...this.messagesSubject.getValue(), message]);
    // });
  }

  public sendMessage(test: string): void {
    this.hubConnection.invoke('SendMessage', test).catch((err) => console.error(err));
  }

  public joinGroup(groupId: number): void {
    this.hubConnection.invoke('JoinGroup', groupId).catch((err) => console.error(err));
  }

  public leaveGroup(groupId: number): void {
    this.hubConnection.invoke('LeaveGroup', groupId).catch((err) => console.error(err));
  }
}
