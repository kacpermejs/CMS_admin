import { createAction, props } from "@ngrx/store";
import { ContentField } from "app/features/content-models/models/ContentModel";

export const createContentModel = createAction(
  '[Model] Create Content Model',
  props<{name: string, description?: string}>()
);

export const loadContentModel = createAction(
  '[Model] Load Content Model',
  props<{id: string}>()
);

export const contentModelLoadingSuccess = createAction(
  '[Model] Content Model Loading Success',
  props<{id: string, name: string, fields: ContentField[], description?: string}>()
);

export const contentModelLoadingFailure = createAction(
  '[Model] Content Model Loading Failure',
  props<{error: string}>()
);

export const addContentField = createAction(
  '[Model] Add Content Field',
  props<{field: ContentField}>()
);

// Sending to the cloud
export const saveContentModel = createAction(
  '[Model] Save Model'
);

export const contentModelSavingSuccess = createAction(
  '[Model] Content Model Saving Success',
  props<{id: string}>()
);

export const contentModelSavingFailure = createAction(
  '[Model] Content Model Saving Failure',
  props<{error: string}>()
);