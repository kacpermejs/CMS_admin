// src/@core/store/user/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialUserData, initialUserState } from '../models/UserState';
import { loginWithPassword, loginSuccess, loginFailure, logout, logoutFailure, logoutSuccess, credentialsLoadingSuccess, credentialsLoadingFailure, credentialsLoading, userDataLoading, userDataLoadingSuccess, userDataLoadingFailure } from '../actions/auth.actions';
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
    user: initialUserData,
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
    user: initialUserData,
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
  on(credentialsLoadingSuccess, (state, {auth}) => ({
    ...state,
    auth: auth,
    loading: false,
    error: null,
  })),
  on(credentialsLoadingFailure, (state, {error}) => ({
    ...state,
    user: initialUserData,
    loading: false,
    error
  })),
// ===================================================
  on(userDataLoading, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(userDataLoadingSuccess, (state, {user}) => ({
    ...state,
    user: user,
    loading: false,
    error: null,
  })),
  on(userDataLoadingFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error
  })),
);
