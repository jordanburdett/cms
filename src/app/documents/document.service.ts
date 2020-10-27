import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from './documents.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  // Properties
  documents: Document[] = [];
  selectedDocumentEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  // constructors
  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  // methods
  
  // returns all the documents
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // returns the document with the passed in id
  getDocument(id: number): Document {
    return this.documents.find((document) => document.id == id);
  }

  // updates a document at the location of the original document passed in
  updateDocument(orginalDocument: Document, newDocument: Document) {
    if (orginalDocument === null || newDocument === null) {
      return;
    }

    // get the index of the original document
    const index = this.documents.indexOf(orginalDocument);
    if (index < 0) {
      return;
    }

    this.documents[index] = newDocument;

    // make a copy and inform those subscribed to the change
    const documentClone = this.documents.slice();
    this.documentChangedEvent.next(documentClone);
  }

  // deletes the document passed in
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  // adds a new document with a verified id
  addDocument(document: Document) {
    if (document === null) {
      return;
    }

    // set a valid Id for the document
    this.maxDocumentId++;
    document.id = this.maxDocumentId;

    // push the document to the documents list
    this.documents.push(document);

    // update all that are subscibed with the new document list.
    const documentClone = this.documents.slice();
    this.documentChangedEvent.next(documentClone);
  }

  // Calculates the max id in the current list of Documents
  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach((document) => {
      if (document.id > maxId) {
        maxId = document.id;
      }
    });

    return maxId;
  }
}
