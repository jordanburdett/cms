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
    this.http.get("https://cms-fullstack-class.firebaseio.com/messages.json").subscribe((messages: Message[]) => {
      messages.forEach(message => {
        message.sender = contactService.getContact(String(message.id)).name;
      })
      
      this.messages = messages;
      this.messagesChangedEvent.next(messages.slice());
    })
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    console.log(message);
    this.messagesChangedEvent.next(this.messages);

    this.http.put("https://cms-fullstack-class.firebaseio.com/messages.json", this.messages).subscribe((result) => {
      console.log("updates on firebase ");
      console.log(result);
    })
  }

  getCurrentlength(): number {
    return this.messages.length;
  }
}
