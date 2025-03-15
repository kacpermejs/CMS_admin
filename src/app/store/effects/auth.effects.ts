import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { loginSuccess, logoutSuccess } from '../actions/user.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          console.log("Navigating on successful login");
          let returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
          if (!returnUrl) returnUrl = '/'; // Default to dashboard
          
          console.log('Navigating to:', returnUrl);
          this.router.navigateByUrl(returnUrl);
        })
      ),
    { dispatch: false}
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutSuccess),
        tap(() => {
          console.log("Navigating on logout");
          this.router.navigate(['/']); // Redirect to login page after logout
        })
      ),
    { dispatch: false }
  );
}
