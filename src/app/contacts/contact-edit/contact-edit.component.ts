
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  @ViewChild('form', { static: false }) form: NgForm;

  originalContact: Contact;
  editId = 0;
  isEditing = false;

  groupContacts: Contact[];

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.editId = +params['id'];

      if (!this.editId) {
        this.isEditing = false;
        return;
      }

      this.isEditing = true;

      // get the original contact
      this.originalContact = this.contactService.getContact(
        String(this.editId)
      );

      if (!this.originalContact) {
        console.log("umm we don't have that contact....");
        return;
      }

      // set the value
      setTimeout(() => {
        this.form.setValue({
          name: this.originalContact.name,
          email: this.originalContact.email,
          phone: this.originalContact.phone,
          url: this.originalContact.imageUrl,
        });

        this.groupContacts = this.originalContact.group;
      });
    });
  }

  onRemoveItem() {}

  onCancel() {
    this.form.resetForm();
    this.isEditing = false;
  }

  onSubmit() {
    const values = this.form.value;

    const newContact = new Contact(
      '0',
      values.name,
      values.email,
      values.phone,
      values.url,
      this.groupContacts
    );

    if (this.isEditing) {
      this.contactService.updateContact(this.originalContact, newContact)
    }
    else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(["/contacts"])
  }
}
