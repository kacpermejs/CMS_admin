import { ContentField } from "app/features/content-models/models/ContentModel";

export interface ContentModelCreationState {
  name: string | null;
  id: string | null;
  description: string | null;
  fields: ContentField[];

  isSynchronized: boolean; 
  loading: boolean;
  error: string | null;
}

export const initialContentModelCreationState: ContentModelCreationState = {
  name: null,
  id: null,
  description: null,
  fields: [],

  isSynchronized: false,
  loading: false,
  error: null
}
