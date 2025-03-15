import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserRole } from '@core/models/UserRole';
import { select, Store } from '@ngrx/store';
import { selectCredentialsLoading, selectUserRole } from '@core/store/selectors/user.selectors';
import { take, map, switchMap, filter } from 'rxjs';

export const clientAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.pipe(
    // First, check if the credentials are loading
    select(selectCredentialsLoading),
    switchMap((loading) => {
      if (loading) {
        // If credentials are still loading, wait until loading is complete
        return store.pipe(
          select(selectCredentialsLoading),
          filter((loaded) => !loaded), // wait until loading is complete
          take(1), // Ensures we only check once after loading is finished
          switchMap(() => {
            // Now that loading is done, we check the user role
            return store.pipe(
              select(selectUserRole),
              take(1),
              map((role: UserRole | undefined) => {
                if (role === UserRole.Client) {
                  return true; // Allow navigation
                }
                // If the role is not 'Client', redirect to login page
                router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                return false; // Deny navigation
              })
            );
          })
        );
      } else {
        // If credentials are not loading, directly check the user role
        return store.pipe(
          select(selectUserRole),
          take(1),
          map((role: UserRole | undefined) => {
            if (role === UserRole.Client) {
              return true; // Allow navigation
            }
            // If the role is not 'Client', redirect to login page
            router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false; // Deny navigation
          })
        );
      }
    })
  );
};
