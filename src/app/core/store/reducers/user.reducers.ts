import { createReducer, on } from "@ngrx/store";
import { initialUserData, initialUserState } from "../models/UserState";
import { setUserData, userDataLoading, userDataLoadingSuccess, userDataLoadingFailure, userDataIncomplete } from "../actions/user.actions";
import { UserRole } from "@core/models/UserRole";

export const userDataReducer = createReducer(
  initialUserState,
  on(setUserData, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(userDataLoading, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(userDataLoadingSuccess, (state, { user }) => ({
    ...state,
    user: { ...state.user, ...user },
    loading: false,
    error: null,
  })),
  on(userDataIncomplete, (state, { user }) => ({
    ...state,
    user: {...state.user, role: UserRole.Client, ...user}, //authenticated so cannot be Guest, but can be Admin loaded from Firebase
    loading: false,
  })),
  on(userDataLoadingFailure, (state, { error }) => ({
    ...state,
    user: initialUserData,
    loading: false,
    error,
  })),
  on(setUserData, (state, { user }) => ({
    ...state,
    user: { ...state.user, ...user },
    loading: false,
    error: null,
  }))
)