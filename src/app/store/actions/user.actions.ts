// src/app/store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserState } from '../models/UserState';
import { UserRole } from '@core/models/UserRole';

// Action to initiate login
export const login = createAction(
  '[User] Login',
  props<{ email: string, password: string }>()
);

// Action when login is successful
export const loginSuccess = createAction(
  '[User] Login Success',
  props<{ userRole: UserRole }>()
);

// Action when login fails
export const loginFailure = createAction(
  '[User] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[User] Logout');

// Action when logout is successful
export const logoutSuccess = createAction('[User] Logout Success');

// Action when logout fails
export const logoutFailure = createAction(
  '[User] Logout Failure',
  props<{ error: string }>()
);

export const credentialsLoading = createAction(
  '[User] Credentials Loading'
);

export const credentialsLoadingSuccess = createAction(
  '[User] Credentials Loading Success',
  props<{ userRole: UserRole }>()
);

export const credentialsLoadingFailure = createAction(
  '[User] Credentials Loading Failure',
  props<{ error: string }>()
);
