import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from 'src/app/win-ref.service';
import { DocumentService } from '../document.service';
import Document from '../documents.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: number;
  nativeWindow: Window;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private windowRef: WinRefService,
    private router: Router
  ) {
    this.nativeWindow = windowRef.getNativeWindow();
  }

  ngOnInit(): void {
    // Set up the route's to listen for changes
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.document = this.documentService.getDocument(this.id);
    });
  }

  onView(): void {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete(): void {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents']);
  }
}
