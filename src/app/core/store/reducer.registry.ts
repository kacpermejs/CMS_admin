import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { UserDataState } from './models/UserState';
import { authReducer } from './reducers/auth.reducers';
import { userDataReducer } from './reducers/user.reducers';
import { UserAuthState } from './models/AuthState';

export interface State {
  auth: UserAuthState
  user: UserDataState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  user: userDataReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
