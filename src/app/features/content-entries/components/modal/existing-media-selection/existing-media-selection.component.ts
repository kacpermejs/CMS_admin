import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalComponent } from '@core/components/modal/modal.component';
import { ModalService } from '@core/components/modal/modal.service';
import { Store } from '@ngrx/store';
import { MediaUploadService } from 'app/features/content-entries/services/media-upload-service/media-upload.service';
import { selectEntryId } from 'app/features/content-entries/store/entry-creation.feature';
import { Observable, firstValueFrom, from, map } from 'rxjs';
import { ButtonDirective } from "primeng/button";
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-existing-media-selection',
  imports: [CommonModule, ModalComponent, ButtonDirective, PaginatorModule],
  templateUrl: './existing-media-selection.component.html',
  styleUrl: './existing-media-selection.component.css',
})
export class ExistingMediaSelectionComponent {
  private uploadService = inject(MediaUploadService);
  private route = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private store = inject(Store);

  entryId$ = this.store.select(selectEntryId);
  mediaForEntryField$: Observable<string | null> = this.route.queryParamMap.pipe(
    map((params) => params.get('mediaForEntryField'))
  );

  userFiles: any[] = [];
  selectedFileId: string | null = null;
  selectedFiles: { fileId: string; forControlKey: string }[] = [];

  // Pagination
  page = 1;
  size = 12; // files per page
  totalFiles = 0;

  constructor() {
    this.loadFiles(this.page);
  }

  loadFiles(page: number) {
    from(this.uploadService.getUserFiles(page, this.size)).subscribe((files: any[]) => {
      this.userFiles = files;
      this.totalFiles = files.length; // or get total count from server
    });
  }

  onPageChange(event: any) {
    this.page = event.page + 1; // PrimeNG pages are 0-indexed
    this.loadFiles(this.page);
  }

  onSelect(fileId: string) {
    this.selectedFileId = fileId;
  }

  async onOk() {
    const mediaForEntryField = await firstValueFrom(this.mediaForEntryField$);

    if (!mediaForEntryField) {
      throw new Error('Missing mediaForEntryKey route parameter!');
    }

    if (!this.selectedFileId) {
      throw new Error('No file selected!');
    }

    this.selectedFiles.push({
      fileId: this.selectedFileId,
      forControlKey: mediaForEntryField,
    });

    this.modalService.result({ selectedFiles: this.selectedFiles }).close({
      queryParams: {
        mediaForEntryField: null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
