import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentUserProvider } from '../../../providers/current-user.provider';
import { SignalRService } from '../../../services/signalr.service';
import { MessageTypeEnum } from '../../enums/chat-message-type.enum';

@Component({
  selector: 'synchro-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, TranslateModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  @ViewChild('messagesEnd') private messagesEnd!: ElementRef;

  public receivedMessage: string;
  public chatRoomName: string = '';

  public MessageTypeEnum = MessageTypeEnum;

  public userName!: string;
  public userId: string;

  public messages: { userId: string; userName: string; message?: string; messageType: MessageTypeEnum }[] = [];
  public newMessage: string = '';

  public constructor(
    public readonly signalRService: SignalRService,
    private readonly currentUserProvider: CurrentUserProvider,
  ) {
    this.userName = this.currentUserProvider.getFullName();
    this.userId = this.currentUserProvider.currentUser.id!;
  }

  public ngOnInit(): void {
    this.signalRService.joinChat(this.userName);

    this.signalRService.on('JoinedToChat', (userNameJoined: string) => {
      this.messages.push({ userId: this.userId, userName: userNameJoined, messageType: MessageTypeEnum.Joined });
      this.scrollToBottom();
    });

    this.signalRService.on('ReceiveMessage', (userName: string, message: string, userId: string) => {
      this.messages.push({ userId, userName, message, messageType: MessageTypeEnum.Regular });
      this.scrollToBottom();
    });
  }

  public sendMessage(): void {
    if (this.newMessage.trim()) {
      this.signalRService.sendMessage(this.newMessage);
      this.newMessage = '';
    }
  }

  public scrollToBottom(): void {
    setTimeout(() => this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' }), 0);
  }
}
