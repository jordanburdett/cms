import { asLiteral } from '@angular/compiler/src/render3/view/util';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentService } from '../document.service';
import Document from '../documents.model';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  editId = 0;
  editMode = false;
  originalDocument: Document;
  sub: Subscription;

  @ViewChild('editForm', { static: false }) form: NgForm;
  @ViewChild('description', { static: false }) description: HTMLInputElement;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.editId = +params['id'];

      if (!this.editId) {
        this.editMode = false;
        return;
      }

      const tempDoc = this.documentService.getDocument(this.editId);

      if (!tempDoc) {
        return;
      }

      this.editMode = true;
      this.originalDocument = tempDoc;

      setTimeout(() => {
        this.form.setValue({
          name: this.originalDocument.name,
          description: this.originalDocument.description || '',
          url: this.originalDocument.url,
        });
      });

      //JSON.parse(JSON.stringify(tempDoc));
    });
  }

  onCancel() {
    this.clearForm();
  }

  onSubmit() {
    const newDoc = new Document(
      0,
      this.form.value.name,
      this.form.value.description,
      this.form.value.url,
      null
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDoc);
    } else {
      this.documentService.addDocument(newDoc);
    }

    this.router.navigate(['/documents']);
  }

  clearForm() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
