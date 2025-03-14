// src/app/store/user/user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../models/UserState';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUserRole = createSelector(
  selectUserState,
  (state: UserState) => state.role
);
