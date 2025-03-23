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

export enum ContentTypes {
  Text = "Text",
  RichText = "RichText",
  Number = "Number",
  Boolean = "Boolean"
}

export interface ContentField {
  id: string;
  name: string;
  type: ContentTypes;
  required: boolean;
  //TODO add order
}

export interface ContentModelEntry<T = Record<string, any>> {
  sys: {
    id: string;
    createdAt?: string;
    updatedAt: string;
  };
  fields: T;
}
