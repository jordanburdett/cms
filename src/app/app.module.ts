import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactListItemComponent } from './contacts//contact-list/contact-list-item/contact-list-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentsListComponent } from './documents/documents-list/documents-list.component';
import { DocumentListItemComponent } from './documents/documents-list/document-list-item/document-list-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { MessageListItemComponent } from './messages/message-list/message-list-item/message-list-item.component';
import { MessageEditComponent } from './messages/message-list/message-edit/message-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactListItemComponent,
    DocumentsComponent,
    DocumentsListComponent,
    DocumentListItemComponent,
    DocumentDetailComponent,
    MessagesComponent,
    MessageListComponent,
    MessageListItemComponent,
    MessageEditComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
