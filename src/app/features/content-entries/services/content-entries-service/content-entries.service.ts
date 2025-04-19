import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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

    return collectionData(entriesRef, {idField: 'id'}).pipe(
      map((snapshot) =>
        snapshot.map((doc) => ({ ...doc }))
      )
    );
  }
}
