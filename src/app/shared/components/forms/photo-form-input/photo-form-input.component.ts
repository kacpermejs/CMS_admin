import { Component, inject, OnInit } from '@angular/core';
import { FORM_INPUT_BASE_VIEW_PROVIDERS } from '../form-input-base/FORM_INPUT_BASE_VIEW_PROVIDERS';
import { SimpleFormInputBase } from '../form-input-base/SimpleFormInputBase';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalService } from '@core/components/modal/modal.service';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { MediaUploadService } from 'app/features/content-entries/services/media-upload-service/media-upload.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { updateEditableField } from 'app/features/content-entries/store/entry-creation.actions';
import { selectValues } from 'app/features/content-entries/store/entry-creation.feature';
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-photo-form-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonDirective,
    RouterModule,
    Menu
],
  templateUrl: './photo-form-input.component.html',
  styleUrl: './photo-form-input.component.css',
  viewProviders: [...FORM_INPUT_BASE_VIEW_PROVIDERS],
})
export class PhotoFormInputComponent
  extends SimpleFormInputBase
  implements OnInit
{
  router = inject(Router);
  route = inject(ActivatedRoute);
  store = inject(Store);
  modalService = inject(ModalService);
  mediaUploadService = inject(MediaUploadService);

  menuItems: MenuItem[] = [];

  previewUrl$?: Observable<string | null>;

  ngOnInit() {
    this.previewUrl$ = this.store.select(selectValues).pipe(
      map((fields) => fields[this.controlKey] ?? null),
      switchMap((fileId) => {
        if (!fileId) return of(null);
        return this.mediaUploadService.getPreviewUrl(fileId);
      })
    );

    this.menuItems = [
      {
        label: 'New',
        icon: 'pi pi-plus',
        command: () => this.openUploadModal(),
      },
      {
        label: 'Existing',
        icon: 'pi pi-folder-open',
        command: () => this.openSelectionModal(),
      },
    ];
  }

  get control() {
    return this.parentFormGroup.get(this.controlKey)!;
  }

  openUploadModal() {
    this.modalService
      .open('upload-image', {
        queryParams: {
          mediaForEntryField: this.controlKey,
        },
        queryParamsHandling: 'merge',
      })
      .then((result) => {
        const uploadedFiles: { fileId: string; forControlKey: string }[] =
          result.uploadedFiles;

        const fileId = uploadedFiles.find(
          (f) => f.forControlKey === this.controlKey
        )?.fileId;

        this.store.dispatch(
          updateEditableField({ fieldId: this.controlKey, value: fileId })
        );
      });
  }

  openSelectionModal() {
    this.modalService
      .open('select-existing-image', {
        queryParams: {
          mediaForEntryField: this.controlKey,
        },
        queryParamsHandling: 'merge',
      })
      .then((result) => {
        const selectedFiles: { fileId: string; forControlKey: string }[] =
          result.selectedFiles;

        const fileId = selectedFiles.find(
          (f) => f.forControlKey === this.controlKey
        )?.fileId;

        this.store.dispatch(
          updateEditableField({ fieldId: this.controlKey, value: fileId })
        );
      });
  }

  getDisplayValue(path: string | null): string {
    if (!path) return '';
    // Split into segments and remove first 2
    const parts = path.split('/');
    return parts.slice(2).join('/');
  }
}
