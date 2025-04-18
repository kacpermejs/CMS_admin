import { Routes } from "@angular/router";
import { ContentEntriesListComponent } from "./components/content-entries-list/content-entries-list.component";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { userEntriesListFeature } from "./components/content-entries-list/store/EntriesListState";
import { UserEntriesListEffects } from "./components/content-entries-list/store/user-entries-list.effects";

export const CONTENT_ENTRIES_ROUTES: Routes = [
  {path: '', component: ContentEntriesListComponent, 
    providers: [
      provideState(userEntriesListFeature),
      provideEffects(UserEntriesListEffects)
    ]
  }
]