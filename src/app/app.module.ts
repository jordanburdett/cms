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
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    MessageEditComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, DragDropModule],
  providers: [FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
