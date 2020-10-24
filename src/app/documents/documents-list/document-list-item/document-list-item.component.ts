import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Document from '../../documents.model';
@Component({
  selector: 'app-document-list-item',
  templateUrl: './document-list-item.component.html',
  styleUrls: ['./document-list-item.component.css'],
})
export class DocumentListItemComponent implements OnInit {
  @Input() document: Document;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onDocumentClick(): void {
    this.router.navigate([`${this.document.id}`], { relativeTo: this.route });
  }
}
