import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Contact from '../contact.model';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelected = new EventEmitter<Contact>();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onContactClicked(contact: Contact): void {
    this.contactService.selectedContactEvent.emit(contact);
  }
}
