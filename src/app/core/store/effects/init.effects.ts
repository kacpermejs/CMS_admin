import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";
import { initApp } from "../actions/init.actions";
import { credentialsLoading } from "../actions/auth.actions";

@Injectable()
export class InitEffects {
  private actions$ = inject(Actions);

  initApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initApp),
      map(() => {
        return credentialsLoading();
      })
    )
  );
}