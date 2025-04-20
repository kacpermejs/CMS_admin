import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentModel, ContentModelEntry, TextFieldOptions } from 'app/features/content-models/models/ContentModel';
import { combineLatest, Observable, tap } from 'rxjs';
import { loadUserEntries, selectUserEntries, selectUserTypes } from './store/EntriesListState';
import { RelativeTimePipe } from "../../../../shared/utils/RelativeTimePipe";

@Component({
  selector: 'app-content-entries-list',
  imports: [CommonModule, RouterModule, RelativeTimePipe],
  templateUrl: './content-entries-list.component.html',
  styleUrl: './content-entries-list.component.css',
})
export class ContentEntriesListComponent implements OnInit {
  store = inject(Store);

  entries$: Observable<ContentModelEntry[]>;
  models$: Observable<ContentModel[]>;
  readonly entriesWithModels$: Observable<[ContentModelEntry[], ContentModel[]]>

  constructor() {
    this.entries$ = this.store.select(selectUserEntries);
    this.models$ = this.store.select(selectUserTypes);

    this.entriesWithModels$ = combineLatest([this.entries$, this.models$]);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserEntries({id: 'Post'}));
  }

  getEntryTitle(entry: ContentModelEntry<Record<string, any>>, models: ContentModel[]): string {

    const model = models.find(m => m.id === entry.sys.typeId);
    if (!model) return '(unknown model)';
  
    const titleField = model.fields.find(f => (f.metadata?.settings?.fieldOptions as TextFieldOptions).entryTitle); // Assuming each model has one title field marked
    if (!titleField) return '(untitled)';
  
    return entry.fields[titleField.id] || '(untitled)';
  }

  openEditModal(_t12: any) {
    throw new Error('Method not implemented.');
  }
}
