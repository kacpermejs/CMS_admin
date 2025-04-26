import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserAuthState } from '../models/AuthState';

const selectUserAuthState = createFeatureSelector<UserAuthState>('auth');

export const selectUserUid = createSelector(
  selectUserAuthState,
  (state: UserAuthState) => state.auth?.uid
);
