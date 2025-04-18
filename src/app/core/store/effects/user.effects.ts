import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  userDataLoading,
  userDataLoadingSuccess,
  userDataLoadingFailure,
  setUserData,
  userDataIncomplete,
  userDataCompleted,
} from '../actions/user.actions';
import { of } from 'rxjs';
import { UserService } from '@core/services/user/user.service';
import { select, Store } from '@ngrx/store';
import { selectUserAuthState, selectUserDataState } from '../selectors/user.selectors';



@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private userService = inject(UserService);
  private store = inject(Store);

  userDataLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDataLoading),
      switchMap((auth) =>
        this.userService.getUserData(auth.uid).pipe(
          map((user) => {
            // Check if user data is complete (adjust fields as needed)
            if (!user || !user.nickname || !user.tier || !user.role) {
              return userDataIncomplete({user});
            }
            return userDataLoadingSuccess({ user });
          }),
          catchError((e) => of(userDataLoadingFailure({ error: e.message })))
        )
      )
    )
  );

  userDataLoadingSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDataLoadingSuccess),
        tap((d) => {
          console.log('User data retrieved successfully!', d);
        })
      ),
    { dispatch: false }
  );

  userDataLoadingFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDataLoadingFailure),
        tap((e) => {
          console.log(e.error);
        })
      ),
    { dispatch: false }
  );

  userDataIncomplete$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDataIncomplete),
        tap((u) => {
          console.log('Incomplete user data: ', u.user);
        })
      ),
    { dispatch: false }
  );

  navigateOnMissingUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDataLoadingFailure, userDataIncomplete),
        tap((e) => {
          this.router.navigateByUrl('/fill-user-data');
        })
      ),
    { dispatch: false }
  );

  setUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserData),
      withLatestFrom(
        this.store.pipe(select(selectUserAuthState)),
        this.store.pipe(select(selectUserDataState))), // action doesn't have all information, state has it merged
      switchMap(([action, authState, userState]) => {
        if (!authState.auth) {
          return of(userDataLoadingFailure({ error: 'User is not authenticated' }));
        }

        const uid = authState.auth.uid;
        return this.userService.setUserData(uid, userState.user).pipe(
          map(() => userDataCompleted({uid})),
          catchError((error) => of(userDataLoadingFailure({ error })))
        );
      })
    )
  );

  userDataCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDataCompleted),
      map((u) => userDataLoading({uid: u.uid})),
    )
  );

  navigateOnDataCompleted$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDataCompleted),
      tap(() => this.router.navigate([''])),
    ),
    {dispatch: false}
  );
}


