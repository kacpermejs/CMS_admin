import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ContentModel,
  ContentModelData,
  ContentModelEntry,
  TextFieldOptions,
} from 'app/features/content-models/models/ContentModel';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import {
  deleteEntry,
  loadUserEntries,
  selectUserEntries,
  selectUserTypes,
} from './store/EntriesListState';
import { RelativeTimePipe } from '../../../../shared/utils/RelativeTimePipe';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialog } from "primeng/confirmdialog";

interface EntryWithModel extends ContentModelEntry {
  model: ContentModelData;
}

interface TitledEntry extends EntryWithModel {
  title: string;
}

@Component({
  selector: 'app-content-entries-list',
  providers: [
    ConfirmationService
  ],
  imports: [
    CommonModule,
    RouterModule,
    RelativeTimePipe,
    ButtonModule,
    MenuModule,
    ConfirmDialog
],
  templateUrl: './content-entries-list.component.html',
  styleUrl: './content-entries-list.component.css',
})
export class ContentEntriesListComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  route = inject(ActivatedRoute);

  entries$: Observable<ContentModelEntry[]>;
  models$: Observable<ContentModel[]>;
  titledEntries$: Observable<TitledEntry[]>;

  menuMap = new Map<string, MenuItem[]>();
  confirmService = inject(ConfirmationService);

  addEntryDropdownVisible = false;

  constructor() {
    this.entries$ = this.store.select(selectUserEntries);
    this.models$ = this.store.select(selectUserTypes);

    this.titledEntries$ = this.models$.pipe(
      switchMap((models) =>
        this.entries$.pipe(
          map((entries) => {
            return entries.map(
              (e) =>
                ({
                  ...e,
                  title: this.getEntryTitle(e, models),
                  model: models.find((m) => m.id === e.sys.modelId),
                } as TitledEntry)
            );
          })
        )
      )
    );

    this.entries$.subscribe((models) => {
      this.menuMap.clear();
      models.forEach((item) => {
        this.menuMap.set(item.id, this.createMenuItems(item));
      });
    });
  }

  private createMenuItems(item: ContentModelEntry): MenuItem[] {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.onEdit(item),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
          this.confirmService.confirm({
            header: 'Confirm deletion',
            message:`
              Are you sure you want to delete that model and all its entries?
            `,
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.onDelete(item),
          })
        }
      },
    ];
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserEntries());
  }

  getEntryTitle(entry: ContentModelEntry, models: ContentModel[]): string {
    const { schema, sys, fields } = entry;

    // Prefer version 1: use the titleField if specified directly on the entry
    // if (schema == 1)
    if (sys.titleField && fields[sys.titleField]) {
      return fields[sys.titleField];
    }

    // Fallback to version 0: find the model and use its designated title field
    const model = models.find((m) => m.id === sys.modelId);
    if (!model) return '(unknown model)';

    const titleField = model.fields.find(
      (f) =>
        (f.metadata?.settings?.fieldOptions as TextFieldOptions)?.entryTitle
    );

    return titleField ? fields[titleField.id] || '(untitled)' : '(untitled)';
  }

  onNew(model: ContentModel) {
    this.closeAddEntryDropdown();
    this.router.navigate(['edit', 'new'], {
      relativeTo: this.route,
      queryParams: { modelId: model.id },
    });
  }

  onEdit(entry: ContentModelEntry) {
    this.closeAddEntryDropdown();
    this.router.navigate(['edit', entry.id], {
      relativeTo: this.route,
      queryParams: { modelId: entry.sys.modelId },
    });
  }

  onDelete(entry: ContentModelEntry) {
    this.store.dispatch(deleteEntry({entryId: entry.id}));
  }

  toggleAddEntryDropdown() {
    this.addEntryDropdownVisible = !this.addEntryDropdownVisible;
  }

  closeAddEntryDropdown() {
    this.addEntryDropdownVisible = false;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: MouseEvent) {
    const button = event.target as HTMLElement;
    if (!button.closest('.relative')) {
      this.addEntryDropdownVisible = false;
    }
  }
}
