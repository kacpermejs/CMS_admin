import { inject, Injectable } from '@angular/core';
import { selectUserUid } from '@core/store/selectors/user.selectors';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ContentModelCreatorService } from 'app/features/content-models/services/content-model-creator/content-model-creator.service';
import { withLatestFrom, map, switchMap, catchError, of, forkJoin, combineLatest, tap } from 'rxjs';
import { loadUserEntries, userEntriesLoadingSuccess, userEntriesLoadingFailure } from './EntriesListState';
import { ContentEntriesService } from 'app/features/content-entries/services/content-entries-service/content-entries.service';

@Injectable()
export class UserEntriesListEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private contentService = inject(ContentEntriesService);

  loadEntries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserEntries),
      withLatestFrom(this.store.select(selectUserUid)),
      map(([action, uid]) => {
        if (!uid) throw new Error('User not authenticated');
        return { action, uid };
      }),
      switchMap(({ action, uid }) =>
        combineLatest([
          this.contentService.getModelEntries(uid),
          this.contentService.getUserModels(uid),
        ]).pipe(
          map(([modelEntries, userTypes]) =>
            userEntriesLoadingSuccess({ list: modelEntries, userTypes })
          ),
          catchError((e) => of(userEntriesLoadingFailure({ error: e })))
        )
      )
    )
  );
}
