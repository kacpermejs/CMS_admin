import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import {
  ContentModel,
  ContentModelEntry,
} from 'app/features/content-models/models/ContentModel';
import { Observable, map } from 'rxjs';

export interface ContentModelEntryDTO extends ContentModelEntry {
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContentEntriesService {
  private firestore = inject(Firestore);

  constructor() {}

  getModelEntries(uid: string): Observable<ContentModelEntryDTO[]> {
    const entriesRef = collection(
      this.firestore,
      `users/${uid}/entries/`
    );

    return collectionData(entriesRef, { idField: 'id' }).pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          const { id, ...rest } = doc;
          const result: ContentModelEntryDTO = {
            ...(rest as ContentModelEntry),
            id,
          };
          return result;
        })
      )
    );
  }

  getUserModels(uid: string): Observable<ContentModel[]> {
    const modelsRef = collection(this.firestore, `users/${uid}/contentModels`);

    return collectionData(modelsRef, { idField: 'id' }).pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          return { ...doc } as ContentModel;
        })
      )
    );
  }
}
