import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  contactsSub: Subscription;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // retrieve all the contacts
    this.contacts = this.contactService.getContacts();

    // listen for changes in the contacts
    this.contactsSub = this.contactService.onContactChange.subscribe(
      (contacts) => {
        this.contacts = contacts;
      }
    );
  }

  onAddContact(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }
}
