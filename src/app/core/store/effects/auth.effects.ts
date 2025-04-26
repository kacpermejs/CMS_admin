import { Injectable, inject } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "@core/services/auth/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of, tap } from "rxjs";
import {
  signUpWithPassword,
  loginSuccess,
  loginFailure,
  loginWithPassword,
  signInWithGoogle,
  credentialsLoading,
  credentialsLoadingSuccess,
  credentialsLoadingFailure,
  logout,
  logoutSuccess,
  logoutFailure,
} from '../actions/auth.actions';
import { userDataLoading, userLoggedOut } from "../actions/user.actions";
import { extractToAuthInfo } from "./extractToAuthInfo";

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private auth = inject(AuthService);

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

  credentialsLoadingFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(credentialsLoadingFailure),
      tap((u) => {
        console.log(u);
      })
    ),
    {dispatch: false}
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
          switchMap(() => {
            console.log('User signed out');
            return of(
              logoutSuccess(),
              userLoggedOut()
            );
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
          window.location.href = '/'; //Reload site for easy full state wipe
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