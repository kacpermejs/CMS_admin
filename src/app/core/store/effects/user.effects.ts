import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
  loginWithPassword,
  loginFailure,
  loginSuccess,
  logoutSuccess,
  signInWithGoogle,
  credentialsLoading,
  credentialsLoadingSuccess,
  credentialsLoadingFailure,
  logoutFailure,
  signUpWithPassword,
  logout,
  userDataLoading,
  userDataLoadingSuccess,
  userDataLoadingFailure,
  setUserData,
} from '../actions/user.actions';
import { AuthService } from '@core/services/auth/auth.service';
import { User } from '@angular/fire/auth';
import { of } from 'rxjs';
import { UserAuthInfo } from '../models/UserState';
import { UserService } from '@core/services/user/user.service';
import { select, Store } from '@ngrx/store';
import { selectUserState } from '../selectors/user.selectors';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private auth = inject(AuthService);
  private userService = inject(UserService);
  private store = inject(Store);

  signUpWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpWithPassword),
      switchMap((c) =>
        this.auth.signUpWithEmailAndPassword(c.email, c.password).pipe(
          map((c) => loginSuccess({ auth: extractToAuthInfo(c.user) })),
          catchError((e) => {
            console.error('Error signing up with email and password:', e);
            return of(loginFailure({ error: e.message }));
          })
        )
      )
    )
  );

  loginWithPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginWithPassword),
      switchMap((c) =>
        this.auth.signInWithEmailAndPassword(c.email, c.password).pipe(
          map((c) => loginSuccess({ auth: extractToAuthInfo(c.user) })),
          catchError((e) => {
            console.error('Error signing in with email and password:', e);
            return of(loginFailure({ error: e.message }));
          })
        )
      )
    )
  );

  signInWithGoogle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signInWithGoogle),
      switchMap(() =>
        this.auth.signInWithGoogle().pipe(
          map((c) => loginSuccess({ auth: extractToAuthInfo(c.user) })),
          catchError((e) => {
            console.error('Error signing in with google:', e);
            return of(loginFailure({ error: e.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map((u) => {
        console.log('User signed in successfully!', u);
        return userDataLoading({ uid: u.auth.uid });
      })
    )
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginFailure),
        tap((e) => {
          throw new Error(e.error);
        })
      ),
    { dispatch: false }
  );

  credentialsLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(credentialsLoading),
      switchMap(() =>
        this.auth.checkAuthState().pipe(
          map((user) => {
            if (user) {
              return credentialsLoadingSuccess({
                auth: extractToAuthInfo(user),
              });
            } else {
              // No user is signed in
              return credentialsLoadingFailure({
                error: 'Could not load credentials!',
              });
            }
          })
        )
      )
    )
  );

  credentialsLoadingSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(credentialsLoadingSuccess),
      map((u) => {
        console.log('Credentials loaded successfully!', u);
        return userDataLoading({ uid: u.auth.uid });
      })
    )
  );

  userDataLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userDataLoading),
      switchMap((auth) =>
        this.userService.getUserData(auth.uid).pipe(
          map((user) => {
            // Check if user data is complete (adjust fields as needed)
            if (!user || !user.nickname || !user.tier || !user.role) {
              throw new Error('User data is incomplete');
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

  navigateOnMissingUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(userDataLoadingFailure),
        tap((e) => {
          this.router.navigateByUrl('/fill-user-data');
        })
      ),
    { dispatch: false }
  );

  setUserData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setUserData),
      withLatestFrom(this.store.pipe(select(selectUserState))),
      switchMap(([action, state]) => {
        if (!state.auth) {
          return of(userDataLoadingFailure({ error: 'User is not authenticated' }));
        }

        const uid = state.auth.uid;
        return this.userService.setUserData(uid, state.user).pipe(
          map(() => userDataLoading({ uid })),
          catchError((error) => of(userDataLoadingFailure({ error })))
        );
      })
    )
  );

  navigationOnLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          console.log('Navigating on successful login');
          let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
          if (!returnUrl) returnUrl = '/';

          console.log('Navigating to:', returnUrl);
          this.router.navigateByUrl(returnUrl);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap((c) =>
        this.auth.signOut().pipe(
          map(() => {
            console.log('User signed out');
            return logoutSuccess();
          }),
          catchError((e) => {
            console.error('Error signing out:', e);
            return of(loginFailure({ error: e.message }));
          })
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          console.log('User logged out!');
        })
      ),
    { dispatch: false }
  );

  logoutFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutFailure),
        tap((e) => {
          throw new Error(e.error);
        })
      ),
    { dispatch: false }
  );

  navigationOnLogoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          console.log('Navigating on logout');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}

function extractToAuthInfo(user: User): UserAuthInfo {
  console.log('UserAuth:', user);
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    metadata: user.metadata,
  };
}
