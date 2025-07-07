import {
  createAction,
  createFeature,
  createReducer,
  on,
  props,
} from '@ngrx/store';
import { ContentModel } from 'app/features/content-models/models/ContentModel';
import { deleteContentModel, deleteContentModelFailure, deleteContentModelSuccess } from 'app/features/content-models/store/content-model-creation.actions';

export interface ModelListState {
  list: ContentModel[];
  loading: boolean;
  error: string | null;
}

export const initialModelListState: ModelListState = {
  list: [],
  loading: false,
  error: null,
};

export const loadUserModels = createAction(
  '[ModelList] Load User Models',
);

export const userModelsLoadingSuccess = createAction(
  '[ModelList] User Model Loading Success',
  props<{ list: ContentModel[] }>()
);

export const userModelsLoadingFailure = createAction(
  '[ModelList] User Model Loading Failure',
  props<{ error: string }>()
);

export const userModelsListFeature = createFeature({
  name: 'userContentModels',
  reducer: createReducer(
    initialModelListState,
    on(loadUserModels, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(userModelsLoadingSuccess, (state, { list }) => ({
      ...state,
      list: list,
      loading: false,
      error: null,
    })),
    on(userModelsLoadingFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),
    on(deleteContentModel, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(deleteContentModelSuccess, (state, {id}) => ({
      ...state,
      list: state.list.filter((model) => model.id !== id),
      loading: false,
      error: null,
    })),
    on(deleteContentModelFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
  ),
});

export const {
  name: userModelListFeatureKey,
  reducer: userModelListReducer,
  selectList: selectUserModels,
  selectLoading: selectUserModelsLoading,
  selectError: selectUserModelsLoadingError
} = userModelsListFeature
