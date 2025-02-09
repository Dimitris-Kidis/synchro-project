import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { CurrentUserProvider } from '../providers/current-user.provider';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private isConnected = false;

  public constructor(private readonly currentUserProvider: CurrentUserProvider) {}

  public init(): void {
    if (this.hubConnection) {
      return;
    }

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7162/chatHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connected');
        this.isConnected = true;
      })
      .catch((err) => console.error('Error connecting to SignalR:', err));

    this.hubConnection.onclose(() => {
      console.warn('SignalR disconnected');
      this.isConnected = false;
    });
  }

  public async joinChat(userName: string): Promise<void> {
    if (!this.hubConnection || !this.isConnected) {
      console.warn('SignalR connection is not established.');
      return;
    }

    try {
      await this.hubConnection.invoke('JoinChatAsync', userName);
      console.log(`${userName} joined the chat room.`);
    } catch (err) {
      console.error('Error joining chat:', err);
    }
  }

  public async sendMessage(message: string): Promise<void> {
    if (!this.hubConnection || !this.isConnected) {
      console.warn('SignalR connection is not established.');
      return;
    }

    const fullName: string = this.currentUserProvider.getFullName();

    try {
      await this.hubConnection.invoke('SendMessageAsync', this.currentUserProvider.currentUser.id, fullName, message);
      console.log('Message sent:', message);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  }

  public on(eventName: string, callback: (...args: any[]) => void): void {
    if (this.hubConnection) {
      this.hubConnection.on(eventName, callback);
    }
  }

  public disconnect(): void {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => {
        console.log('SignalR disconnected');
        this.isConnected = false;
      });
    }
  }

  //   private hubConnection: signalR.HubConnection | null = null;
  //   private isConnected = false;

  //   public init(): void {
  //     if (this.hubConnection) {
  //       return; // Уже инициализировано
  //     }

  //     this.hubConnection = new signalR.HubConnectionBuilder()
  //       .withUrl('https://localhost:7162/chatHub')
  //       .configureLogging(signalR.LogLevel.Information)
  //       .withAutomaticReconnect()
  //       .build();

  //     this.hubConnection
  //       .start()
  //       .then(() => {
  //         console.log('SignalR connected');
  //         this.isConnected = true;
  //       })
  //       .catch((err) => console.error('Error connecting to SignalR:', err));

  //     this.hubConnection.onclose(() => {
  //       console.warn('SignalR disconnected');
  //       this.isConnected = false;
  //     });
  //   }

  //   public invoke(methodName: string, ...args: any[]): void {
  //     if (this.hubConnection && this.isConnected) {
  //       this.hubConnection.invoke(methodName, ...args).catch((err) => console.error(err));
  //     } else {
  //       console.warn('Cannot invoke SignalR method: not connected');
  //     }
  //   }

  //   public on(eventName: string, callback: (...args: any[]) => void): void {
  //     if (this.hubConnection) {
  //       this.hubConnection.on(eventName, callback);
  //     }
  //   }
}
