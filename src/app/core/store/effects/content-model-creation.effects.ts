import { inject, Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addContentField, contentModelLoadingFailure, contentModelLoadingSuccess, createContentModel, loadContentModel } from "../actions/content-model-creation.actions";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { ContentModelCreatorService } from "app/features/content-models/services/content-model-creator/content-model-creator.service";
import { Store } from "@ngrx/store";
import { selectUserUid } from "../selectors/user.selectors";

@Injectable()
export class ContentModelCreationEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private contentService = inject(ContentModelCreatorService);
  private store = inject(Store);

  loadContentModel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadContentModel),
      withLatestFrom(this.store.select(selectUserUid)),
      map(([action, uid]) => {
        if (!uid) throw new Error('User not authenticated')
        return {action, uid};
      }),
      switchMap(({action, uid}) => this.contentService.getById(uid, action.id)),
      map( res => {
        if (!res) throw new Error('Model does not exist!');
        return contentModelLoadingSuccess({...res});
      }),
      catchError( e => of(contentModelLoadingFailure({error: e.message})))
    )
  );

  addContentField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addContentField),
      tap( f => {
        console.log(f.field);
      })
    ),
    {dispatch: false}
  );

}
