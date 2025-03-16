// src/@core/store/user/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialUserState } from '../models/UserState';
import { loginWithPassword, loginSuccess, loginFailure, logout, logoutFailure, logoutSuccess, credentialsLoadingSuccess, credentialsLoadingFailure, credentialsLoading } from '../actions/user.actions';
import { UserRole } from '@core/models/UserRole';


export const userReducer = createReducer(
  initialUserState,
  on(loginWithPassword, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { auth }) => ({
    ...state,
    auth: auth,
    loading: false,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(logout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    role: UserRole.Guest, // Reset to 'Guest' role after logout
    auth: null,
    loading: false,
    error: null,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(credentialsLoading, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(credentialsLoadingSuccess, (state, {auth}) => ({
    ...state,
    auth: auth,
    loading: false,
    error: null,
  })),
  on(credentialsLoadingFailure, (state, {error}) => ({
    ...state,
    role: UserRole.Guest,
    loading: false,
    error
  }))
);
