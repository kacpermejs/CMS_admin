import { createReducer, on } from "@ngrx/store";
import { initialContentModelCreationState } from "../models/ContentModelCreationState";
import { addContentField, contentModelLoadingFailure, contentModelLoadingSuccess, contentModelSavingFailure, contentModelSavingSuccess, createContentModel, loadContentModel, saveContentModel, updateField } from "../actions/content-model-creation.actions";

export const contentModelCreationReducer = createReducer(
  initialContentModelCreationState,
  on(createContentModel, (state, {name, description}) => ({
    ...state,
    name,
    description: description ?? null,
    fields: [], //this creates completely new one
    id: null,
    isSynchronized: false
  })),
  on(loadContentModel, (state, {id}) => ({ //initializes loading
    ...state,
    id: id,
    loading: true,
    isSynchronized: false
  })),
  on(contentModelLoadingSuccess, (state, {id, name, fields, description}) => ({
    ...state,
    id,
    name,
    fields,
    description: description ?? null,
    error: null,
    loading: false,
    isSynchronized: true
  })),
  on(contentModelLoadingFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
    isSynchronized: false
  })),
  on(addContentField, (state, {field}) => ({
    ...state,
    fields: [...state.fields, field],
    isSynchronized: false
  })),
  on(updateField, (state, {id, changes}) => ({
    ...state,
    fields: state.fields.map(field =>
      field.id === id ? { ...field, ...changes } : field
    ),
    isSynchronized: false
  })),
  on(saveContentModel, (state) => ({
    ...state,
    loading: true,
    isSynchronized: false
  })),
  on(contentModelSavingSuccess, (state, {id}) => ({
    ...state,
    id,
    loading: false,
    isSynchronized: true,
    error: null
  })),
  on(contentModelSavingFailure, (state, {error}) => ({
    ...state,
    error,
    isSynchronized: false,
    loading: false
  })),
);
