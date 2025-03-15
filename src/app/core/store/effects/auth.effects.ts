import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { loginWithPassword, loginFailure, loginSuccess, logoutSuccess, signInWithGoogle, credentialsLoading, credentialsLoadingSuccess, credentialsLoadingFailure, logoutFailure, signUpWithPassword, logout } from '../actions/user.actions';
import { AuthService } from '@core/services/auth/auth.service';
import { UserRole } from '@core/models/UserRole';
import { User } from '@angular/fire/auth';
import { of } from 'rxjs';

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
          map((c) => loginSuccess({ userRole: this.getUserRole(c.user) })),
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
          map((c) => loginSuccess({ userRole: this.getUserRole(c.user) })),
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
      switchMap((c) =>
        this.auth.signInWithGoogle().pipe(
          map((c) => loginSuccess({ userRole: this.getUserRole(c.user) })),
          catchError((e) => {
            console.error('Error signing in with google:', e);
            return of(loginFailure({ error: e.message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect( () =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap( (u) => {
        console.log('User signed in successfully!', u);
      })
    ),
    { dispatch: false }
  );

  loginFailure$ = createEffect( () =>
    this.actions$.pipe(
      ofType(loginFailure),
      tap( (e) => {
        throw new Error(e.error);
      })
    ),
    { dispatch: false }
  );

  private getUserRole(user: User): UserRole {
    return UserRole.Client; // TODO Assuming all users are clients for simplicity
  }

  credentialsLoading$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(credentialsLoading),
      switchMap( () => this.auth.checkAuthState().pipe(
        map( user => {
          if (user) {
            // User is signed in
            const userRole: UserRole = this.getUserRole(user);
            return credentialsLoadingSuccess({userRole});
          } else {
            // No user is signed in
            return credentialsLoadingFailure({error: "Could not load credentials!"});
          }
        })
      ))
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
            return logoutSuccess()
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
