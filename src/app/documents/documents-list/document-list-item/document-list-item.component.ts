import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Document from '../../documents.model';
@Component({
  selector: 'app-document-list-item',
  templateUrl: './document-list-item.component.html',
  styleUrls: ['./document-list-item.component.css'],
})
export class DocumentListItemComponent implements OnInit {
  @Input() document: Document;

  @Output() documentSelected = new EventEmitter<Document>();

  constructor() {}

  ngOnInit(): void {}

  onDocumentClick() {
    this.documentSelected.emit(this.document);
  }
}
