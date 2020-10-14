import {EventEmitter, Injectable} from '@angular/core';
import Message from './message.model';
import {MOCKMESSAGES} from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messagesChangedEvent = new EventEmitter<Message[]>();

  constructor() {
    this.messages = MOCKMESSAGES;
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message {
    return this.messages.find(message => message.id === id);
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    console.log(message);
    this.messagesChangedEvent.emit(this.messages);
  }

  getCurrentlength(): number {
    return this.messages.length;
  }
}