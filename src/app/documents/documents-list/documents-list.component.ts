import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Document from '../documents.model';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit {
  @Output() onDocumentSelectedChange = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      '1',
      'JordansFile',
      'A file made by jordan',
      'Someurl.com',
      null
    ),
    new Document('1', '1', 'A file made by jordan', 'Someurl.com', null),
    new Document('1', '2', 'A file made by jordan', 'Someurl.com', null),
    new Document('1', '3', 'A file made by jordan', 'Someurl.com', null),
    new Document('1', '4', 'A file made by jordan', 'Someurl.com', null),
    new Document('1', '5', 'A file made by jordan', 'Someurl.com/longerurlthatislongerthantheotherones', null),
    new Document(
      '1',
      'JordansFile',
      'A file made by jordan',
      'Someurl.com',
      null
    ),
    new Document(
      '1',
      'JordansFile',
      'A file made by jordan',
      'Someurl.com',
      null
    ),
  ];
  constructor() {}

  ngOnInit(): void {}

  onDocumentSelected(document: Document) {
    this.onDocumentSelectedChange.emit(document);
  }
}
