import { createFeature, createReducer } from "@ngrx/store";
import { ContentModelData, ContentType } from "app/features/content-models/models/ContentModel";

export interface EditableField {
  fieldId: string;
  label: string;
  value: any;
  type: ContentType;
  required?: boolean;
}

export interface EntryCreationState {
  modelId: string | null;
  contentModel: ContentModelData | null;

  entryId: string | null;
  editableFields: EditableField[];
  
  loading: boolean;
  error: string | null;
}

export const initialEntryCreationState: EntryCreationState = {
  modelId: null,
  contentModel: null,

  entryId: null,
  editableFields: [],

  loading: false,
  error: null
};

export const entryCreationFeature = createFeature({
  name: 'entryCreation',
  reducer: createReducer(
    initialEntryCreationState
  )
});

export const {
  name: entryCreationFeatureKey,
  reducer: entryCreationReducer,
} = entryCreationFeature;