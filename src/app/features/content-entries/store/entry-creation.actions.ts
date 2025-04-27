import { createAction, props } from "@ngrx/store";
import { ContentModelData } from "app/features/content-models/models/ContentModel";
import { EditableField } from "./entry-creation.feature";

export const loadContentModel = createAction(
  '[Entry Creation] Load Content Model',
  props<{ modelId: string }>()
);

export const loadContentModelSuccess = createAction(
  '[Entry Creation] Load Content Model Success',
  props<{ contentModel: ContentModelData }>()
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
  props<{ editableFields: EditableField[] }>()
);

export const loadEntryFailure = createAction(
  '[Entry Creation] Load Entry Failure',
  props<{ error: string }>()
);

export const updateEditableField = createAction(
  '[Entry Creation] Update Editable Field',
  props<{ fieldId: string; value: any }>()
);

export const saveEntry = createAction(
  '[Entry Creation] Save Entry',
  props<{ modelId: string; fields: EditableField[]; entryId?: string }>()
);

export const saveEntrySuccess = createAction(
  '[Entry Creation] Save Entry Success',
  props<{ entryId: string }>()
);

export const saveEntryFailure = createAction(
  '[Entry Creation] Save Entry Failure',
  props<{ error: string }>()
);

