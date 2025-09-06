import { Component, inject } from '@angular/core';
import { FORM_INPUT_BASE_VIEW_PROVIDERS } from '../form-input-base/FORM_INPUT_BASE_VIEW_PROVIDERS';
import { SimpleFormInputBase } from '../form-input-base/SimpleFormInputBase';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalService } from '@core/components/modal/modal.service';

@Component({
  selector: 'app-photo-form-input',
  imports: [ReactiveFormsModule, ButtonDirective, RouterModule],
  templateUrl: './photo-form-input.component.html',
  styleUrl: './photo-form-input.component.css',
  viewProviders: [...FORM_INPUT_BASE_VIEW_PROVIDERS],
})
export class PhotoFormInputComponent extends SimpleFormInputBase {
  router = inject(Router);
  route = inject(ActivatedRoute);
  modalService = inject(ModalService);

  openSelectionModal() {
    throw new Error('Method not implemented.');
  }

  openUploadModal() {
    this.modalService.open('upload-image');
  }
}
