// src/@core/store/user/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDataState } from '../models/UserState';

const selectUserDataState = createFeatureSelector<UserDataState>('user');

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
