import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ContentModel, ContentModelEntry } from 'app/features/content-models/models/ContentModel';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentEntriesService {
  private firestore = inject(Firestore);

  constructor() { }

  getModelEntries(modelId: string, uid: string): Observable<any[]> {
    const entriesRef = collection(
      this.firestore,
      `users/${uid}/contentModels/${modelId}/entries`
    );


    return collectionData(entriesRef, { idField: 'id' }).pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          const { id, ...rest } = doc;
          
          return { ...rest, sys: { ...rest['sys'], id, typeId: modelId } } as ContentModelEntry;
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
