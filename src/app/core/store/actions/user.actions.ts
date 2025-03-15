// src/@core/store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserState } from '../models/UserState';
import { UserRole } from '@core/models/UserRole';

// Action to initiate login
export const signUpWithPassword = createAction(
  '[User] Sign Up With Password',
  props<{ email: string, password: string }>()
);

export const loginWithPassword = createAction(
  '[User] Login With Password',
  props<{ email: string, password: string }>()
);

export const signInWithGoogle = createAction(
  '[User] Sign In With Google'
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
