import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Message from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  messagesSub: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();

    this.messagesSub = this.messageService.messagesChangedEvent.subscribe(
      (messages) => {
        this.messages = messages;
      }
    );
  }

  ngOnDestroy(): void {
    this.messagesSub.unsubscribe();
  }
}
