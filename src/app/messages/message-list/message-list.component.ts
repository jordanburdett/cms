import { Component, Input, OnInit } from '@angular/core';
import Message from '../message.model';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Subject', 'Some message', 'Jordan'),
    new Message('2', 'asdfasdf', 'asdfSdfsdaf', 'asdfasdfas'),
  ];

  constructor() {}

  ngOnInit(): void {}

  createNewMessage(newMessage: { subject: string; msg: string }) {
    this.messages.push(
      new Message(
        String(this.messages.length + 1),
        newMessage.subject,
        newMessage.msg,
        'ME'
      )
    );
  }
}
