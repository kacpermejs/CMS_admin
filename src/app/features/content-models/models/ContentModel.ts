import { Timestamp, FieldValue } from '@angular/fire/firestore';


export interface ContentModelData {
  id: string;
  name: string;
  description?: string;
  fields: ContentField[];
}

export interface ContentModel extends ContentModelData {
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
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
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
}

export interface ContentModelEntry<T = Record<string, any>> {
  sys: ModelEntrySystemInfo;
  fields: T;
}
