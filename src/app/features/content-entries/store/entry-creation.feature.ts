import { createFeature, createReducer, on } from "@ngrx/store";
import { ContentModelData, ContentType, EntryFields } from "app/features/content-models/models/ContentModel";
import { loadContentModel, loadContentModelSuccess, loadContentModelFailure, loadEntry, loadEntrySuccess, loadEntryFailure, updateEditableField, saveEntry, saveEntrySuccess, saveEntryFailure } from "./entry-creation.actions";

export interface EntryCreationState {
  modelId: string | null;
  contentModel: ContentModelData | null;

  entryId: string | null;
  values: EntryFields;
  
  loading: boolean;
  error: string | null;
}

export const initialEntryCreationState: EntryCreationState = {
  modelId: null,
  contentModel: null,

  entryId: null,
  values: [],

  loading: false,
  error: null
};

export const entryCreationFeature = createFeature({
  name: 'entryCreation',
  reducer: createReducer(
    initialEntryCreationState,
  
    // Handle loading the content model
    on(loadContentModel, (state, { modelId }) => ({
      ...state,
      loading: true,
      modelId: modelId,
      error: null,
    })),
  
    // Handle successful content model load
    on(loadContentModelSuccess, (state, { contentModel }) => ({
      ...state,
      loading: false,
      contentModel: contentModel,
      error: null,
    })),
  
    // Handle failure of loading content model
    on(loadContentModelFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),
  
    // Handle loading an entry
    on(loadEntry, (state, { entryId }) => ({
      ...state,
      loading: true,
      entryId: entryId,
      error: null,
    })),
  
    // Handle successful entry load
    on(loadEntrySuccess, (state, { values }) => ({
      ...state,
      loading: false,
      values: values,
      error: null,
    })),
  
    // Handle failure of loading entry
    on(loadEntryFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })),
  
    // Handle updating an editable field
    on(updateEditableField, (state, { fieldId, value }) => ({
      ...state,
      values: {
        ...state.values,
        [fieldId]: value
      }
    })),
  
    // Handle saving an entry
    on(saveEntry, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
  
    // Handle successful entry save
    on(saveEntrySuccess, (state, { entryId }) => ({
      ...state,
      loading: false,
      entryId: entryId,
      error: null,
    })),
  
    // Handle failure of saving entry
    on(saveEntryFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    }))
  )
});

export const {
  name: entryCreationFeatureKey,
  reducer: entryCreationReducer,
  selectContentModel,
  selectValues
} = entryCreationFeature;