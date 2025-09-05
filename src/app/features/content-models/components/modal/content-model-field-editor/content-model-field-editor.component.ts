import { Component, inject } from '@angular/core';
import { ModalComponent } from "../../../../../core/components/modal/modal.component";
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalService } from '@core/components/modal/modal.service';

@Component({
  selector: 'app-content-model-field-editor',
  imports: [ModalComponent, RouterModule],
  templateUrl: './content-model-field-editor.component.html',
  styleUrl: './content-model-field-editor.component.css'
})
export class ContentModelFieldEditorComponent {
  modalService = inject(ModalService);
}
