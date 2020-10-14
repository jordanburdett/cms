import { Component, OnInit } from '@angular/core';
import {DocumentService} from './document.service';
import Document from './documents.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  selectedDocument: Document = null;
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.selectedDocumentEvent.subscribe(document => this.selectedDocument = document);
  }

}
