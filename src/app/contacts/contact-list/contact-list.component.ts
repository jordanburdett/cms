import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Contact from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[];

  @Output() onSelected = new EventEmitter<Contact>();

  constructor() {}

  ngOnInit(): void {}

  onContactClicked(contact: Contact) {
    console.log("clicked")
    this.onSelected.emit(contact);
  }
}
