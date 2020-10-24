import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Document from '../documents.model';
import {DocumentService} from '../document.service';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit {

  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    // Listen for changes to the documents
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
  }
}
