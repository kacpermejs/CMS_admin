import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, getDocs, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { ContentModel } from '../../models/ContentModel';

export interface ModelDTO {
  id: string,
  name: string,
  fields: any[],
  description?: string
}

@Injectable({
  providedIn: 'root',
})
export class ContentModelCreatorService {
  private firestore = inject(Firestore);

  constructor() {}

  createContentModel(
    userUid: string,
    data: ModelDTO
  ): Observable<string> {
    const modelRef = doc(this.firestore, `users/${userUid}/contentModels/${data.id}`);

    const model: ContentModel = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    return from(setDoc(modelRef, model)).pipe(
      map(() => data.id)
    );
  }

  addContentEntry(modelId: string, fields: Record<string, any>, uid: string) {
    const entriesRef = collection(
      this.firestore,
      `users/${uid}/contentModels/${modelId}/entries`
    );

    return from(
      addDoc(entriesRef, {
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        fields,
      })
    );
  }

  getById(userUid: string, modelId: string) {
    const docRef = doc(this.firestore, 'users', userUid, 'contentModels', modelId);

    return docData(docRef).pipe(
      map((d) =>
        d
          ? ({
              id: d['id'],
              ...d
            } as ContentModel)
          : undefined
      )
    );
  }

  getUserModels(uid: string): Observable<any[]> {
    const modelsRef = collection(this.firestore, `users/${uid}/contentModels`);

    return collectionData(modelsRef).pipe(
      map((snapshot) =>
        snapshot.map((doc) => {
          return { id: doc['id'], ...doc } as ContentModel;
        })
      )
    );
  }

  getModelEntries(modelId: string, uid: string): Observable<any[]> {
    const entriesRef = collection(
      this.firestore,
      `users/${uid}/contentModels/${modelId}/entries`
    );

    return from(getDocs(entriesRef)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }
}
