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
import { contentModelCreationReducer } from './reducers/content-model-creation.reducers';
import { ContentModelCreationState } from './models/ContentModelCreationState';

export interface State {
  auth: UserAuthState
  user: UserDataState;
  contentModel: ContentModelCreationState;
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducer,
  user: userDataReducer,
  contentModel: contentModelCreationReducer
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
