import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalComponent } from '@core/components/modal/modal.component';
import { ModalService } from '@core/components/modal/modal.service';
import { Store } from '@ngrx/store';
import { MediaUploadService } from 'app/features/content-entries/services/media-upload-service/media-upload.service';
import { selectEntryId } from 'app/features/content-entries/store/entry-creation.feature';
import { ShortTextFormInputComponent } from 'app/shared/components/forms/short-text-form-input/short-text-form-input.component';
import { ButtonDirective } from 'primeng/button';
import { firstValueFrom, map, Observable } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  imports: [
    CommonModule,
    ModalComponent,
    ReactiveFormsModule,
    ShortTextFormInputComponent,
    ButtonDirective,
    RouterModule,
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css',
})
export class ImageUploadComponent implements OnDestroy {
  form: FormGroup;

  entryId$: Observable<string | null>;
  mediaForEntryField$: Observable<string | null>;

  private fb = inject(FormBuilder);
  private uploadService = inject(MediaUploadService);
  private route = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private store = inject(Store);

  uploadedFiles: { fileId: string, forControlKey: string }[] = [];

  constructor() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      file: [null, Validators.required],
    });

    this.entryId$ = this.store.select(selectEntryId);

    this.mediaForEntryField$ = this.route.queryParamMap.pipe(
      map(params => params.get('mediaForEntryField'))
    );
  }

  ngOnDestroy(): void {
    console.log(this.uploadedFiles);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.form.patchValue({ file: input.files[0] });
      this.form.get('file')?.updateValueAndValidity();
    }
  }

  async onSave() {
    if (this.form.valid) {
      const { title, description, file } = this.form.value;
      
      const mediaForEntryField = await firstValueFrom(this.mediaForEntryField$);

      if (!mediaForEntryField)
        throw new Error('Missing mediaForEntryKey route parameter!')

      // Upload file to get file identifier
      const fileId = await this.uploadService.uploadMedia( file!, {
        title,
        description,
        association: [],
      });

      this.uploadedFiles.push({ fileId, forControlKey: mediaForEntryField });

      this.modalService.result({ uploadedFiles: this.uploadedFiles }).close({
        queryParams: {
          mediaForEntryField: null,
        },
        queryParamsHandling: 'merge'
      });
    }
  }
}
