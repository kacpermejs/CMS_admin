import { createAction, createFeature, createReducer, on, props } from "@ngrx/store";
import { ContentModel, ContentModelData, ContentModelEntry } from "app/features/content-models/models/ContentModel";

export interface EntriesListState {
  list: ContentModelEntry[];
  userTypes: ContentModel[];
  loading: boolean;
  error: string | null;
}

export const initialEntriesListState: EntriesListState = {
  list: [],
  userTypes: [],
  loading: false,
  error: null,
};

export const loadUserEntries = createAction(
  '[EntriesList] Load User Entries',
);

export const userEntriesLoadingSuccess = createAction(
  '[EntriesList] User Entries Loading Success',
  props<{ list: ContentModelEntry[], userTypes: ContentModel[] }>()
);

export const userEntriesLoadingFailure = createAction(
  '[EntriesList] User Entries Loading Failure',
  props<{ error: string }>()
);

export const userEntriesListFeature = createFeature({
  name: 'userContentEntries',
  reducer: createReducer(
    initialEntriesListState,
    on(loadUserEntries, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(userEntriesLoadingSuccess, (state, { list, userTypes }) => ({
      ...state,
      list: list,
      userTypes: userTypes,
      loading: false,
      error: null,
    })),
    on(userEntriesLoadingFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    }))
  ),
});

export const {
  name: userModelListFeatureKey,
  reducer: userModelListReducer,
  selectList: selectUserEntries,
  selectLoading: selectUserEntriesLoading,
  selectError: selectUserEntriesLoadingError,
  selectUserTypes
} = userEntriesListFeature
