import { Timestamp, FieldValue } from '@angular/fire/firestore';


export interface ContentModelData {
  name: string;
  description?: string;
  fields: ContentField[];
}

//stored in firebase
export interface ContentModelDTO extends ContentModelData {
  schema: number | null;
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

export interface ContentModel extends ContentModelDTO {
  id: string; //firebase document id
}

export enum ContentType {
  Text = "Text",
  RichText = "RichText",
  Number = "Number",
  Boolean = "Boolean"
}

export interface ContentField {
  id: string;
  name: string;
  type: ContentType;
  
  metadata?: FieldMetadata;
}

export interface FieldMetadata {

  validation?: {
    required: boolean;
  }

  settings?: {
    fieldOptions: FieldOptions
  }
}

export interface FieldOptions {
  enableLocalization: boolean;
}

export interface TextFieldOptions extends FieldOptions {
  entryTitle: boolean;
}

export interface TextFieldMetadata extends FieldMetadata {
  settings: {
    fieldOptions: TextFieldOptions;
  }
}

export interface ModelEntrySystemInfo {
  modelId: string;
  titleField?: string;
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

export type EntryFields = Record<string, any>;

export interface ContentModelEntryData<T = EntryFields> {
  sys: ModelEntrySystemInfo;
  fields: T;
}

//stored in firebase
export interface ContentModelEntryDTO extends ContentModelEntryData {
  schema: number | null;
}

export interface ContentModelEntry extends ContentModelEntryDTO {
  id: string; //firebase document id
}
