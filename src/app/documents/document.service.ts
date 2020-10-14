import {EventEmitter, Injectable} from '@angular/core';
import {MOCKDOCUMENTS} from './MOCKDOCUMENTS';
import Document from './documents.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find(document => document.id === id);
  }
}
