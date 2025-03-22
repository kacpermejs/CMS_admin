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

export interface ContentField {
  id: string;
  name: string;
  type: 'Text' | 'RichText' | 'Number' | 'Boolean' | 'Date' | 'Asset' | 'Reference';
  required: boolean;
}

export interface ContentModelEntry<T = Record<string, any>> {
  sys: {
    id: string;
    createdAt?: string;
    updatedAt: string;
  };
  fields: T;
}
