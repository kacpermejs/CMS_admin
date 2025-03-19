// src/@core/store/user/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDataState } from '../models/UserState';
import { UserAuthState } from '../models/AuthState';

export const selectUserDataState = createFeatureSelector<UserDataState>('user');
export const selectUserAuthState = createFeatureSelector<UserAuthState>('auth');

export const selectUserUid = createSelector(
  selectUserAuthState,
  (state: UserAuthState) => state.auth?.uid
);

export const selectUserRole = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.user.role
);

export const selectCredentialsLoading = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.loading
);

export const selectUserDataLoading = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.loading
);

export const selectUserData = createSelector(
  selectUserDataState,
  (state: UserDataState) => state.user
);
