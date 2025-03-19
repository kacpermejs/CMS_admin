import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@core/models/UserRole';
import { select, Store } from '@ngrx/store';
import { selectCredentialsLoading, selectUserDataLoading, selectUserRole } from '@core/store/selectors/user.selectors';
import { take, map, switchMap, filter, combineLatest } from 'rxjs';

export const clientAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return combineLatest([
    store.pipe(select(selectCredentialsLoading)),
    store.pipe(select(selectUserDataLoading))
  ]).pipe(
    filter(([authLoading, userDataLoading]) => !authLoading && !userDataLoading), // Wait until both are loaded
    take(1), // Proceed only once after loading finishes
    switchMap(() =>
      store.pipe(
        select(selectUserRole),
        take(1),
        map((role: UserRole | undefined) => {
          if (role === UserRole.Client) {
            return true; // Allow navigation
          }
          router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false; // Deny navigation
        })
      )
    )
  );
};
