import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentModel, ContentModelEntry, TextFieldOptions } from 'app/features/content-models/models/ContentModel';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { loadUserEntries, selectUserEntries, selectUserTypes } from './store/EntriesListState';
import { RelativeTimePipe } from "../../../../shared/utils/RelativeTimePipe";
import { ContentModelEntryDTO } from '../../services/content-entries-service/content-entries.service';

interface TitledEntry extends ContentModelEntry {
  title: string;
}

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
  titledEntries$: Observable<TitledEntry[]>;

  constructor() {
    this.entries$ = this.store.select(selectUserEntries);
    this.models$ = this.store.select(selectUserTypes);

    this.titledEntries$ = this.models$.pipe(
      switchMap( models => this.entries$.pipe(
        map(entries => {
          return entries.map(e => ({
            ...e,
            title: this.getEntryTitle(e, models)
          } as TitledEntry))
        })
      ))
    )
  }

  ngOnInit(): void {
    this.store.dispatch(loadUserEntries());
  }

  getEntryTitle(entry: ContentModelEntry, models: ContentModel[]): string {
    const model = models.find((m) => m.id === entry.sys.modelId);
    if (!model) return '(unknown model)';

    const titleField = model.fields.find(
      (f) => (f.metadata?.settings?.fieldOptions as TextFieldOptions).entryTitle
    ); // Assuming each model has one title field marked
    if (!titleField) return '(untitled)';

    return entry.fields[titleField.id] || '(untitled)';
  }

  openEditModal(_t12: any) {
    throw new Error('Method not implemented.');
  }
}
