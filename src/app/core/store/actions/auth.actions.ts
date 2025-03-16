// src/@core/store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserAuthInfo } from '../models/UserState';
import { UserData } from '../models/UserState';

// Action to initiate login
export const signUpWithPassword = createAction(
  '[Auth] Sign Up With Password',
  props<{ email: string, password: string }>()
);

export const loginWithPassword = createAction(
  '[Auth] Login With Password',
  props<{ email: string, password: string }>()
);

export const signInWithGoogle = createAction(
  '[Auth] Sign In With Google'
);

// Action when login is successful
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{auth: UserAuthInfo}>()
);

// Action when login fails
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

// Action when logout is successful
export const logoutSuccess = createAction('[Auth] Logout Success');

// Action when logout fails
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>()
);

export const credentialsLoading = createAction(
  '[Auth] Credentials Loading'
);

export const credentialsLoadingSuccess = createAction(
  '[Auth] Credentials Loading Success',
  props<{auth: UserAuthInfo}>()
);

export const credentialsLoadingFailure = createAction(
  '[Auth] Credentials Loading Failure',
  props<{ error: string }>()
);

export const userDataLoading = createAction(
  '[User] User Data Loading',
  props<{uid: string}>()
);

export const userDataLoadingSuccess = createAction(
  '[User] User Data Loading Success',
  props<{user: UserData}>()
);

export const userDataLoadingFailure = createAction(
  '[User] User Data Loading Failure',
  props<{ error: string }>()
);
