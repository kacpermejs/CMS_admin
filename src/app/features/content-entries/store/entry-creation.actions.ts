import { createAction, props } from "@ngrx/store";
import { ContentModel, ContentModelData, EntryFields } from "app/features/content-models/models/ContentModel";

export const loadContentModel = createAction(
  '[Entry Creation] Load Content Model',
  props<{ modelId: string }>()
);

export const loadContentModelSuccess = createAction(
  '[Entry Creation] Load Content Model Success',
  props<{ contentModel: ContentModel }>()
);

export const loadContentModelFailure = createAction(
  '[Entry Creation] Load Content Model Failure',
  props<{ error: string }>()
);

export const loadEntry = createAction(
  '[Entry Creation] Load Entry',
  props<{ entryId: string }>()
);

export const loadEntrySuccess = createAction(
  '[Entry Creation] Load Entry Success',
  props<{ values: EntryFields }>()
);

export const loadEntryFailure = createAction(
  '[Entry Creation] Load Entry Failure',
  props<{ error: string }>()
);

export const updateEditableField = createAction(
  '[Entry Creation] Update Editable Field',
  props<{ fieldId: string; value: any }>()
);

export const clearEntry = createAction(
  '[Entry Creation] Clear Entry',
);

export const saveEntry = createAction(
  '[Entry Creation] Save Entry',
  props<{ modelId: string; fields: EntryFields; entryId?: string }>()
);

export const saveEntrySuccess = createAction(
  '[Entry Creation] Save Entry Success',
  props<{ id: string, values: EntryFields }>()
);

export const saveEntryFailure = createAction(
  '[Entry Creation] Save Entry Failure',
  props<{ error: string }>()
);

