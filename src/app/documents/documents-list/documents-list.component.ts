import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import Document from '../documents.model';
import {DocumentService} from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
  documentSubscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    // Listen for changes to the documents
    this.documentSubscription = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }

  ngOnDestroy(): void {
    this.documentSubscription.unsubscribe();
  }
}
