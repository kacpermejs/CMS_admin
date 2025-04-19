import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContentModelCreationState } from "app/features/content-models/store/ContentModelCreationState";
import { ContentModelData } from "app/features/content-models/models/ContentModel";
import { contentModelCreationFeatureKey } from "./contentModelCreationFeature";

export const selectContentModelCreationState = createFeatureSelector<ContentModelCreationState>(contentModelCreationFeatureKey);

export const selectContentModelData = createSelector(
  selectContentModelCreationState,
  (state) => ({
    ...state
  } as ContentModelData)
);

