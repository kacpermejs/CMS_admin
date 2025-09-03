import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ContentEntriesService } from '../services/content-entries-service/content-entries.service';
import {
  loadContentModel,
  loadContentModelFailure,
  loadContentModelSuccess,
  loadEntry,
  loadEntryFailure,
  loadEntrySuccess,
  saveEntry,
  saveEntryFailure,
  saveEntrySuccess,
} from './entry-creation.actions';
import { selectUserUid } from '@core/store/selectors/auth.selectors';
import { withLatestFrom, map, switchMap, catchError, of, tap } from 'rxjs';
import { ContentEntryCreatorService } from '../services/content-entry-creator-service/content-entry-creator.service';

@Injectable()
export class EntryCreationEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private contentService = inject(ContentEntriesService);
  private creatorService = inject(ContentEntryCreatorService);

  loadContentModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContentModel),
      withLatestFrom(this.store.select(selectUserUid)),
      map(([action, uid]) => {
        if (!uid) throw new Error('User not authenticated');
        return { action, uid };
      }),
      switchMap(({ action, uid }) =>
        this.contentService.getModelById(uid, action.modelId).pipe(
          map((contentModel) => {
            if (!contentModel) throw new Error("Content model doesn't exist");
            return loadContentModelSuccess({ contentModel });
          }),
          catchError((e) => of(loadContentModelFailure({ error: e })))
        )
      )
    )
  );

  loadContentModelSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadContentModelSuccess),
        tap((m) => console.log('Content model loaded: ', m.contentModel))
      ),
    {
      dispatch: false,
    }
  );

  loadContentModelFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadContentModelFailure),
        tap((e) => console.error('Content model loading failure! ', e.error))
      ),
    {
      dispatch: false,
    }
  );

  loadEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEntry),
      withLatestFrom(this.store.select(selectUserUid)),
      map(([action, uid]) => {
        if (!uid) throw new Error('User not authenticated');
        return { action, uid };
      }),
      switchMap(({ action, uid }) =>
        this.contentService.getEntryById(uid, action.entryId).pipe(
          map((entry) => {
            if (!entry)
              throw new Error(
                `Entry with id=\"${action.entryId}\" doesn't exist`
              );
            return loadEntrySuccess({ values: entry.fields });
          }),
          catchError((e) => of(loadEntryFailure({ error: e })))
        )
      )
    )
  );

  loadEntrySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadEntrySuccess),
        tap((entry) => console.log('Entry values loaded: ', entry.values))
      ),
    {
      dispatch: false,
    }
  );

  loadEntryFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadEntryFailure),
        tap((e) => console.error('Entry loading failure! ', e.error))
      ),
    {
      dispatch: false,
    }
  );

  saveEntry$ = createEffect(
    () => this.actions$.pipe(
      ofType(saveEntry),
      withLatestFrom(this.store.select(selectUserUid)),
      map(([action, uid]) => {
        if (!uid) throw new Error('User not authenticated');
        return { action, uid };
      }),
      switchMap(({ action, uid }) =>
        this.creatorService.saveEntry(uid, action.modelId, action.entryId, action.fields).pipe(
          map((entryFields) => {
            if (!action.entryId)
              throw new Error(
                `Entry with id=\"${action.entryId}\" doesn't exist`
              );
            return saveEntrySuccess({values: entryFields});
          }),
          catchError((e) => of(saveEntryFailure({ error: e })))
        )
      )
    )
  );
}
