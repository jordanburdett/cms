import { Pipe, PipeTransform } from '@angular/core';
import Contact from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(value: Contact[], term: string): Contact[] {
    if (!term || term.length < 1) {
      return value;
    }

    const newContacts = value.filter(contact => {
      return contact.name.toLowerCase().includes(term.toLowerCase());
    });

    return newContacts;
  }

}
