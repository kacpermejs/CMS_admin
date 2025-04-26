import { inject, Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { ContentModelCreatorService } from "app/features/content-models/services/content-model-creator/content-model-creator.service";
import { Store } from "@ngrx/store";
import { selectUserUid } from '@core/store/selectors/auth.selectors';
import { selectContentModelData } from "./content-model.selectors";
import { loadContentModel, contentModelLoadingSuccess, contentModelLoadingFailure, addContentField, updateField, saveContentModel, contentModelSavingSuccess, contentModelSavingFailure } from "./content-model-creation.actions";

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

  contentModelLoadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contentModelLoadingSuccess),
      tap(r => {
        console.log('Loaded: ', r);
      })
    ),
    {dispatch: false}
  );

  contentModelLoadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(contentModelLoadingFailure),
      tap(e => {
        console.error('Error while loading model: ', e);
      })
    ),
    {dispatch: false}
  );

  addedContentField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addContentField),
      tap( f => {
        console.log(f.field);
      })
    ),
    {dispatch: false}
  );

  contentFieldChanged$ = createEffect(() => 
    this.actions$.pipe(
      ofType(updateField),
      tap( f => console.log('Field updated: ', f))
    ),
    {dispatch: false}
  );

  saveContentModel$ = createEffect(() => 
    this.actions$.pipe(
      ofType(saveContentModel),
      withLatestFrom(
        this.store.select(selectUserUid),
        this.store.select(selectContentModelData)
      ),
      map(([action, uid, data]) => {
        if (!uid) throw new Error('User not authenticated')
        return {action, uid, data};
      }),
      switchMap(({action, uid, data}) => this.contentService.createContentModel(uid, data)),
      map((id) => {
        return contentModelSavingSuccess({id});
      }),
      catchError( e => of(contentModelSavingFailure({error: e.message})))
    )
  );

}
