import { Component, Input, OnInit } from '@angular/core';
import Contact from '../../contact.model';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styles: [
  ]
})
export class ContactListItemComponent implements OnInit {
  @Input() contact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
