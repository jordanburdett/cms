import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @Output() newMsgCreated = new EventEmitter<{
    subject: string;
    msg: string;
  }>();

  @ViewChild('messageText') messageText: ElementRef<HTMLInputElement>;
  @ViewChild('subjectText') subjectText: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  onCreateClicked() {
    this.newMsgCreated.emit({
      subject: this.subjectText.nativeElement.value,
      msg: this.messageText.nativeElement.value,
    });
    this.messageText.nativeElement.value = '';
    this.subjectText.nativeElement.value = '';
  }
}
