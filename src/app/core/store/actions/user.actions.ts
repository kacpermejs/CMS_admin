// src/@core/store/user/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UserData } from '../models/UserState';

export const setUserData = createAction(
  '[UserState] Set User Data',
  props<{ user: Partial<UserData> }>()
);

export const userDataLoading = createAction(
  '[UserState] User Data Loading',
  props<{ uid: string; }>()
);

export const userDataLoadingSuccess = createAction(
  '[UserState] User Data Loading Success',
  props<{ user: UserData; }>()
);

export const userDataIncomplete = createAction(
  '[UserState] User Data Incomplete',
  props<{ user: Partial<UserData>; }>()
);

export const userDataCompleted = createAction(
  '[UserState] User Data Completed',
  props<{ uid: string; }>()
);

export const userDataLoadingFailure = createAction(
  '[UserState] User Data Loading Failure',
  props<{ error: string; }>()
);

export const userLoggedOut = createAction(
  '[UserState] User Logged Out',
);
