import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContentModelCreationState } from "../models/ContentModelCreationState";
import { ContentModelData } from "app/features/content-models/models/ContentModel";

export const selectContentModelCreationState = createFeatureSelector<ContentModelCreationState>('contentModel');

export const selectContentModelData = createSelector(
  selectContentModelCreationState,
  (state) => ({
    ...state
  } as ContentModelData)
);

export const selectContentModelSynced = createSelector(
  selectContentModelCreationState,
  (state) => state.isSynchronized
);

