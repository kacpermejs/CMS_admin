// src/@core/store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserAuthInfo, UserData } from '../models/UserState';

// Action to initiate login
export const signUpWithPassword = createAction(
  '[UserState] Sign Up With Password',
  props<{ email: string, password: string }>()
);

export const loginWithPassword = createAction(
  '[UserState] Login With Password',
  props<{ email: string, password: string }>()
);

export const signInWithGoogle = createAction(
  '[UserState] Sign In With Google'
);

// Action when login is successful
export const loginSuccess = createAction(
  '[UserState] Login Success',
  props<{auth: UserAuthInfo}>()
);

// Action when login fails
export const loginFailure = createAction(
  '[UserState] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[UserState] Logout');

// Action when logout is successful
export const logoutSuccess = createAction('[UserState] Logout Success');

// Action when logout fails
export const logoutFailure = createAction(
  '[UserState] Logout Failure',
  props<{ error: string }>()
);

export const credentialsLoading = createAction(
  '[UserState] Credentials Loading'
);

export const credentialsLoadingSuccess = createAction(
  '[UserState] Credentials Loading Success',
  props<{auth: UserAuthInfo}>()
);

export const credentialsLoadingFailure = createAction(
  '[UserState] Credentials Loading Failure',
  props<{ error: string }>()
);

export const setUserData = createAction(
  '[UserState] Set User Data',
  props<{ user: UserData }>()
);

export const userDataLoading = createAction(
  '[UserState] User Data Loading',
  props<{ uid: string; }>()
);

export const userDataLoadingSuccess = createAction(
  '[UserState] User Data Loading Success',
  props<{ user: UserData; }>()
);

export const userDataLoadingFailure = createAction(
  '[UserState] User Data Loading Failure',
  props<{ error: string; }>()
);
