import { Component, Input, OnInit } from '@angular/core';
import Message from '../../message.model';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css'],
})
export class MessageListItemComponent implements OnInit {
  @Input() message: Message;

  constructor() {}

  ngOnInit(): void {}
}
