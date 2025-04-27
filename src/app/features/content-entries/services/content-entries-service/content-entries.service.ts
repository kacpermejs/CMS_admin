import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import {
  ContentModel,
  ContentModelEntry,
  ContentModelEntryDTO,
} from 'app/features/content-models/models/ContentModel';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentEntriesService {
  private firestore = inject(Firestore);

  constructor() {}

  getModelEntries(uid: string): Observable<ContentModelEntry[]> {
    const entriesRef = collection(this.firestore, `users/${uid}/entries/`);

    return collectionData(entriesRef, { idField: 'id' }).pipe(
      map((snapshot) =>
        snapshot.map((doc) => ({
          ...(doc as ContentModelEntry),
        }))
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

  getModelById(userUid: string, modelId: string) {
    const docRef = doc(this.firestore, 'users', userUid, 'contentModels', modelId);

    return docData(docRef, {idField: 'id'}).pipe(
      map((d) =>
        d
          ? ({
              ...d
            } as ContentModel)
          : undefined
      )
    );
  }

  getEntryById(userUid: string, modelId: string) {
    const docRef = doc(this.firestore, 'users', userUid, 'entries', modelId);
    return docData(docRef, {idField: 'id'}).pipe(
      map((d) =>
        d
          ? ({
              ...d
            } as ContentModelEntry)
          : undefined
      )
    );
  }
}
