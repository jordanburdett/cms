import { Component, OnInit } from '@angular/core';
import Contact from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(
      '1',
      'R. Kent Jackson',
      'jacksonk@byui.edu',
      '208-496-3771',
      'https://web.byui.edu/Directory/Employee/jacksonk.jpg',
      null
    ),
    new Contact(
      '2',
      'Rex Barzee',
      'barzeer@byui.edu',
      '208-496-2222',
      'https://web.byui.edu/Directory/Employee/barzeer.jpg',
      null
    ),
  ];

  selectedContactIndex: number;
  hasSelected: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
