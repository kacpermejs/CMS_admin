import { Component, inject } from '@angular/core';
import { ModalComponent } from "../../../../../core/components/modal/modal.component";
import { ActivatedRoute } from '@angular/router';
import { ModalFor } from '@core/components/modal/modal-for';

@Component({
  selector: 'app-content-model-field-editor',
  imports: [ModalComponent],
  templateUrl: './content-model-field-editor.component.html',
  styleUrl: './content-model-field-editor.component.css'
})
export class ContentModelFieldEditorComponent implements ModalFor {
  route = inject(ActivatedRoute);

  modalParent(): ActivatedRoute | null {
    return this.route.parent;
  }
}
