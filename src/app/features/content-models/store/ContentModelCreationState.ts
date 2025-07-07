import { ContentField } from "app/features/content-models/models/ContentModel";

export interface ContentModelSnapshot {
  name: string | null;
  id: string | null;
  description: string | null;
  fields: ContentField[];
}

export interface ContentModelCreationState {
  name: string | null;
  id: string | null;
  description: string | null;
  fields: ContentField[];

  loading: boolean;
  error: string | null;

  lastSynced: ContentModelSnapshot | null;
}

export const initialContentModelCreationState: ContentModelCreationState = {
  name: null,
  id: null,
  description: null,
  fields: [],

  loading: false,
  error: null,
  lastSynced: null,
}
