import { Routes } from '@angular/router';
import { ContentEntriesListComponent } from './components/content-entries-list/content-entries-list.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { userEntriesListFeature } from './components/content-entries-list/store/EntriesListState';
import { UserEntriesListEffects } from './components/content-entries-list/store/user-entries-list.effects';
import { EntryEditorComponent } from './components/entry-editor/entry-editor.component';
import { entryCreationFeature } from './store/entry-creation.feature';
import { EntryCreationEffects } from './store/entry-creation.effects';

export const CONTENT_ENTRIES_ROUTES: Routes = [
  {
    path: '',
    component: ContentEntriesListComponent,
    providers: [
      provideState(userEntriesListFeature),
      provideEffects(UserEntriesListEffects),
    ],
  },
  {
    path: 'edit/:id', //can be edit/new
    component: EntryEditorComponent,
    providers: [
      provideState(entryCreationFeature),
      provideEffects(EntryCreationEffects),
    ],
  },
];
