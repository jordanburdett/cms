import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactService } from '../contacts/contact.service';
import Message from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  messagesChangedEvent = new Subject<Message[]>();

  constructor(private http: HttpClient, private contactService: ContactService) {
    this.http.get("http://localhost:3000/api/messages").subscribe((messages: Message[]) => {
      this.messages = messages;
      this.messagesChangedEvent.next(this.messages.slice());
    })
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message): void {
    message.sender = "Jordan";
    this.messages.push(message);
    console.log(message);
    this.messagesChangedEvent.next(this.messages);

    message.sender = "107";
    this.http.post("http://localhost:3000/api/messages", { ...message }).subscribe((result) => {
      console.log(result);
    })
  }

  getCurrentlength(): number {
    return this.messages.length;
  }
}
