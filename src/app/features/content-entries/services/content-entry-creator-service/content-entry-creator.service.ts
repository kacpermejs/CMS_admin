import { inject, Injectable } from '@angular/core';
import { ContentModel, ContentModelEntryDTO, EntryFields, ModelEntrySystemInfo } from 'app/features/content-models/models/ContentModel';
import { from, map, Observable } from 'rxjs';
import { Firestore, addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentEntryCreatorService {

  private firestore = inject(Firestore);
  schemaVersion = 1;

  constructor() { }

  saveEntry(
    uid: string,
    model: ContentModel,
    entryId: string | undefined,
    fields: EntryFields
  ): Observable<{id: string, fields: EntryFields}> {
    
    if (entryId == undefined || entryId === 'new') { //shouldn't be 'new' but I'll leave it like this
      const entriesRef = collection(this.firestore, `users/${uid}/entries`);

      const entry: ContentModelEntryDTO = {
        fields,
        sys: {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          titleField: '',
          modelId: model.id
        },
        schema: this.schemaVersion
      }

      //new entry
      return from(
        addDoc(entriesRef, entry)
      ).pipe(
        map(docRef => ({
          id: docRef.id,
          fields
        }))
      );
    } else {
      //update
      const docRef = doc(this.firestore, `users/${uid}/entries/${entryId}`);

      const sys: Partial<ModelEntrySystemInfo> = {
        updatedAt: serverTimestamp()
      }
      const entry = { //TODO schema check
        fields,
        sys: sys,
        schema: this.schemaVersion
      }

      return from(
        setDoc(docRef, entry, {merge: true})
      ).pipe(
        map(() => ({
          id: entryId,
          fields
        }))
      );
    }
  }
}
