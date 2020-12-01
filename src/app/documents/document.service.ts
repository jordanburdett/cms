import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import Document from './documents.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {
    this.documents = [];
    this.maxDocumentId = this.getMaxId();

    this.http
      .get('http://localhost:3000/api/documents')
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();

        this.documentChangedEvent.next(this.documents.slice());
      });
  }

  // methods

  // pushes all the documents to firebase
  pushToFirebase(documents: Document[]) {
    // push all the contacts to firebase again.
    this.http
      .put(
        'https://cms-fullstack-class.firebaseio.com/documents.json',
        documents
      )
      .subscribe((result) => {
        console.log('after put');
        console.log(result);
      });
  }

  // returns all the documents
  getDocuments(): Document[] {
    return this.documents.slice();
  }

  // returns the document with the passed in id
  getDocument(id: number): Document {
    return this.documents.find((document) => document.id == id);
  }

  // updates a document at the location of the original document passed in
  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null) {
      console.log('THeyre null');
      return;
    }

    // get the index of the original document
    const index = this.documents.indexOf(originalDocument);
    if (index < 0) {
      console.log("Can't find index of original");
      console.log(originalDocument);
      console.log(this.documents);
      return;
    }
    newDocument.id = this.documents[index].id;

    this.documents[index] = newDocument;

    // make a copy and inform those subscribed to the change
    const documentClone = this.documents.slice();
    this.documentChangedEvent.next(documentClone);

    // update the document
    this.http
      .put(
        'http://localhost:3000/api/documents?id=' + newDocument.id,
        {...newDocument}
      )
      .subscribe((result) => {
        console.log('after put');
        console.log(result);
      });
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

    this.http.delete("http://localhost:3000/api/documents?id=" + document.id).subscribe(result => {
      console.log(result);
    })
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

    this.http.post("http://localhost:3000/api/documents", { ... document }).subscribe(result => {
      console.log(result);
    })
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
