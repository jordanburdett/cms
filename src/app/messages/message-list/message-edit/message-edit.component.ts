import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import Message from '../../message.model';
import {MessageService} from '../../message.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('messageText') messageText: ElementRef<HTMLInputElement>;
  @ViewChild('subjectText') subjectText: ElementRef<HTMLInputElement>;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  onCreateClicked(): void {

    const tempMessage = new Message(
      String(this.messageService.getCurrentlength() + 1),
      this.subjectText.nativeElement.value,
      this.messageText.nativeElement.value,
      'ME'
    );

    this.messageService.addMessage(tempMessage);

    this.messageText.nativeElement.value = '';
    this.subjectText.nativeElement.value = '';
  }
}
