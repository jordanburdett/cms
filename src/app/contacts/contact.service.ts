import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService  {
  // Properties

  private contacts: Contact[] = [];
  selectedContactEvent = new Subject<Contact>();
  onContactChange = new Subject<Contact[]>();
  maxContactId: number = 0;

  // constructors

  constructor(private http: HttpClient) {
    this.contacts = [];
    
    // get the data from firebase
    this.http.get("https://cms-fullstack-class.firebaseio.com/contacts.json").subscribe((contacts: Contact[]) => {
      this.contacts = contacts.sort((a, b): number => {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });

      
      this.maxContactId = this.getMaxId();

      this.onContactChange.next(this.contacts.slice());
    }, (error) => {
      console.log(error.message);
    })
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

    this.pushToFirebase(this.contacts);
    
    
  }

  pushToFirebase(contacts: Contact[]) {
    // push all the contacts to firebase again.
    this.http.put("https://cms-fullstack-class.firebaseio.com/contacts.json", contacts).subscribe((result) => {
      console.log("after put");
      console.log(result);
    })
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

    this.pushToFirebase(this.contacts);
  }

  deleteContact(contact: Contact) {
    const index = this.contacts.indexOf(contact);

    if (index < 0) {
      return;
    }
    this.contacts.splice(index, 1);
    this.onContactChange.next(this.contacts.slice());

    this.pushToFirebase(this.contacts);
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
