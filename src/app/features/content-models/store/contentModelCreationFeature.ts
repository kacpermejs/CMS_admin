import {
  Action,
  ActionReducer,
  createFeature,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  createContentModel,
  loadContentModel,
  contentModelLoadingSuccess,
  contentModelLoadingFailure,
  addContentField,
  updateField,
  saveContentModel,
  contentModelSavingSuccess,
  contentModelSavingFailure,
  deleteContentModel,
  deleteContentModelFailure,
  deleteContentModelSuccess,
  deleteModelField,
} from './content-model-creation.actions';
import {
  ContentModelCreationState,
  ContentModelSnapshot,
  initialContentModelCreationState,
} from './ContentModelCreationState';

function detectUnsavedChanges(
  current: ContentModelSnapshot,
  previous: ContentModelSnapshot
): boolean {
  return (
    current.name !== previous.name ||
    current.description !== previous.description ||
    JSON.stringify(current.fields) !== JSON.stringify(previous.fields)
  );
}

export const contentModelCreationFeature = createFeature({
  name: 'contentModelCreation',
  reducer: createReducer(
    initialContentModelCreationState,
    on(createContentModel, (state, { name, description }) => ({
      ...state,
      name,
      description: description ?? null,
      fields: [], //this creates completely new one
      id: null,
    })),
    on(loadContentModel, (state, { id }) => ({
      //initializes loading
      ...state,
      id,
      loading: true,
    })),
    on(
      contentModelLoadingSuccess,
      (state, { id, name, fields, description }) => {
        const lastSynced = {
            id,
            name,
            fields,
            description: description ?? null,
        };
        
        const newState : ContentModelCreationState = {
          ...state,
          ...lastSynced,
          lastSynced: lastSynced,
          error: null,
          loading: false,
        }
        return newState;
      }
    ),
    on(contentModelLoadingFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(addContentField, (state, { field }) => ({
      ...state,
      fields: [...state.fields, field],
    })),
    on(updateField, (state, { id, changes }) => ({
      ...state,
      fields: state.fields.map((field) =>
        field.id === id ? { ...field, ...changes } : field
      ),
    })),
    on(saveContentModel, (state) => ({
      ...state,
      loading: true,
    })),
    on(contentModelSavingSuccess, (state, { id }) => {
        const lastSynced = {
            id: state.id,
            name: state.name,
            fields: [...state.fields],
            description: state.description,
        };
        
        const newState : ContentModelCreationState = {
          ...state,
          lastSynced: lastSynced,
          error: null,
          loading: false,
        }
        return newState;
      }
    ),
    on(deleteModelField, (state, { id }) => ({
      ...state,
      fields: state.fields.filter((f) => f.id !== id),
      loading: true,
      error: null,
    })),
    on(deleteContentModel, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(contentModelSavingFailure, (state, { error }) => ({
      ...state,
      error,
      loading: false,
    })),
    on(deleteContentModelSuccess, (state, { id }) =>
      state.id === id
        ? initialContentModelCreationState
        : { ...state, loading: false }
    )
  ),
});

const selectContentModelCreationState = (state: any) => state[contentModelCreationFeatureKey];

export const selectIsSynchronized = createSelector(
  selectContentModelCreationState,
  (state) => {
    if (!state.lastSynced) return false;

    const currentSnapshot: ContentModelSnapshot = {
      id: state.id,
      name: state.name,
      description: state.description,
      fields: state.fields,
    };

    return !detectUnsavedChanges(currentSnapshot, state.lastSynced);
  }
);

export const {
  name: contentModelCreationFeatureKey,
  reducer: contentModelCreationReducer,
} = contentModelCreationFeature;
