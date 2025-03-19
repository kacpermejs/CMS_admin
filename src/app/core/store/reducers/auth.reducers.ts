import { createReducer, on } from '@ngrx/store';
import { initialUserData, initialUserState } from '../models/UserState';
import {
  loginWithPassword,
  loginSuccess,
  loginFailure,
  logout,
  logoutFailure,
  logoutSuccess,
  credentialsLoadingSuccess,
  credentialsLoadingFailure,
  credentialsLoading
} from '../actions/auth.actions';
import { initialAuthState } from '../models/AuthState';

export const authReducer = createReducer(
  initialAuthState,
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
  // ===================================================
  on(logout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(logoutSuccess, (state) => ({
    ...state,
    auth: null,
    loading: false,
    error: null,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // ===================================================
  on(credentialsLoading, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(credentialsLoadingSuccess, (state, { auth }) => ({
    ...state,
    auth: auth,
    loading: false,
    error: null,
  })),
  on(credentialsLoadingFailure, (state, { error }) => ({
    ...state,
    auth: null,
    loading: false,
    error,
  })),
);
