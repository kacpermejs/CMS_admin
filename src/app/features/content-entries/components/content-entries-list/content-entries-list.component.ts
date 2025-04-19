import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContentModelEntry } from 'app/features/content-models/models/ContentModel';
import { Observable, tap } from 'rxjs';
import { selectUserEntries } from './store/EntriesListState';

@Component({
  selector: 'app-content-entries-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './content-entries-list.component.html',
  styleUrl: './content-entries-list.component.css',
})
export class ContentEntriesListComponent {
  store = inject(Store);

  entries$: Observable<ContentModelEntry[]>

  constructor() {
    this.entries$ = this.store.select(selectUserEntries).pipe(
      tap(list => {
        console.log(list);
      })
    );
  }

  add() {

  }

  openEditModal(_t12: any) {
    throw new Error('Method not implemented.');
  }
}
