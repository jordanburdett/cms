import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  // Properties

  private contacts: Contact[] = [];
  selectedContactEvent = new Subject<Contact>();
  onContactChange = new Subject<Contact[]>();
  maxContactId: number = 0;

  // constructors

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  // methods

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }

    // set a valid Id for the Contact
    this.maxContactId++;
    contact.id = String(this.maxContactId);

    // push the Contact to the Contacts list
    this.contacts.push(contact);

    // update all that are subscibed with the new Contact list.
    const ContactClone = this.contacts.slice();
    this.onContactChange.next(ContactClone);
    
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = this.contacts[pos].id;
    this.contacts[pos] = newContact;
    
    const contactsClone = this.contacts.slice();
    this.onContactChange.next(contactsClone);
  }

  deleteContact(contact: Contact) {
    const index = this.contacts.indexOf(contact);

    if (index < 0) {
      return;
    }
    this.contacts.splice(index, 1);
    this.onContactChange.next(this.contacts.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    this.contacts.forEach((contact) => {
      if (parseInt(contact.id) > maxId) {
        maxId = parseInt(contact.id);
      }
    });

    return maxId;
  }
}
