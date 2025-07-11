import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  getDocs,
  serverTimestamp,
  setDoc,
} from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { ContentModel, ContentModelData, ContentModelDTO } from '../../models/ContentModel';

@Injectable({
  providedIn: 'root',
})
export class ContentModelCreatorService {
  private firestore = inject(Firestore);

  constructor() {}

  createContentModel(
    userUid: string,
    data: Partial<ContentModelData>
  ): Observable<string> {
    if (!data.name)
      throw new Error('You must provide unique name!');

    //TODO more validation

    const id = data.name; //document id

    const model: ContentModelData = {
      name: data.name,
      fields: data.fields ?? [],
      description: data.description,
    };

    const modelFull: ContentModelDTO = {
      ...model,
      schema: 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }

    const modelRef = doc(this.firestore, `users/${userUid}/contentModels/${id}`);

    return from(setDoc(modelRef, modelFull)).pipe(
      map(() => id)
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

  deleteById(uid: string, modelId: string): Observable<void> {
    const docRef = doc(this.firestore, `users/${uid}/contentModels/${modelId}`);
    return from(deleteDoc(docRef));
  }

}
