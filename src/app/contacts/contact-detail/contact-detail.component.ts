import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  contact: Contact = null;
  id: string;

  selectedContactSub: Subscription;


  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // listen for changes in the url's ID property to change the detail
    this.selectedContactSub = this.route.params.subscribe((param: Params) => {
      this.id = param['id'];
      this.contact = this.contactService.getContact(this.id);
      console.log("CONTACT");
      console.log(this.contact);
      if (!this.contact) {
        this.router.navigate(["/contacts"]);
      }
    });
  }

  onEdit(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete(): void {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['contacts']);
  }

  ngOnDestroy(): void {
    this.selectedContactSub.unsubscribe();
  }
}
