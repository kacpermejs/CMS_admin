import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, FieldValue, Firestore, getDocs, serverTimestamp, setDoc, Timestamp } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

export interface ContentModel {
  id: string;
  name: string;
  createdAt?: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  description?: string;
  fields: ContentField[];
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

@Injectable({
  providedIn: 'root'
})
export class ContentModelCreatorService {
  private firestore = inject(Firestore);

  constructor() { }

  createContentModel(uid: string, name: string, fields: any[], description?: string): Observable<void> {

    const modelRef = doc(this.firestore, `users/${uid}/contentModels/${name}`);

    const model: ContentModel = {
      id: name,
      name,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      description: description,
      fields
    }

    return from(setDoc(modelRef, model));
  }

  addContentEntry(modelId: string, fields: Record<string, any>, uid: string) {;

    const entriesRef = collection(this.firestore, `users/${uid}/contentModels/${modelId}/entries`);
    
    return from(addDoc(entriesRef, {
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      fields
    }));
  }

  getUserModels(uid: string): Observable<any[]> {

    const modelsRef = collection(this.firestore, `users/${uid}/contentModels`);
    
    return collectionData(modelsRef).pipe(
      map(snapshot => snapshot.map(doc => {
        return ({ id: doc['id'], ...doc } as ContentModel);
      }))
    );
  }

  getModelEntries(modelId: string, uid: string): Observable<any[]> {

    const entriesRef = collection(this.firestore, `users/${uid}/contentModels/${modelId}/entries`);
    
    return from(getDocs(entriesRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    );
  }
}
