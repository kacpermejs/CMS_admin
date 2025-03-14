// src/app/store/user/user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialUserState } from '../models/UserState';
import { login, loginSuccess, loginFailure, logout, logoutFailure, logoutSuccess } from '../actions/user.actions';
import { UserRole } from '@core/models/UserRole';


export const userReducer = createReducer(
  initialUserState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { userRole }) => ({
    ...state,
    role: userRole,
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
    loading: false,
    error: null,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
