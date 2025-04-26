import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { loadUserModels, userModelsLoadingFailure, userModelsLoadingSuccess } from "./ModelListState";
import { ContentModelCreatorService } from "app/features/content-models/services/content-model-creator/content-model-creator.service";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { selectUserUid } from '@core/store/selectors/auth.selectors';

@Injectable()
export class UserModelListEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private contentService = inject(ContentModelCreatorService);

  loadModels$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserModels),
      withLatestFrom(this.store.select(selectUserUid)),
      map(([action, uid]) => {
        if (!uid) throw new Error('User not authenticated')
          return uid;
      }),
      switchMap((uid) => this.contentService.getUserModels(uid)),
      map(list => {
        return userModelsLoadingSuccess({list})
      }),
      catchError(e => of(userModelsLoadingFailure({error: e})))
    )
  );
}