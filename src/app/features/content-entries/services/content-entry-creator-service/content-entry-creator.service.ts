import { inject, Injectable } from '@angular/core';
import { EntryFields } from 'app/features/content-models/models/ContentModel';
import { from, map, Observable } from 'rxjs';
import { Firestore, addDoc, collection, doc, serverTimestamp, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContentEntryCreatorService {

  private firestore = inject(Firestore);

  constructor() { }

  saveEntry(uid: string, modelId: string, entryId: string | undefined, fields: EntryFields): Observable<EntryFields> {
    
    if (entryId == undefined) {
      const entriesRef = collection(this.firestore, `users/${uid}/entries/`);
      //new entry
      return from(
        addDoc(entriesRef, {
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          fields,
        })
      );
    } else {
      //update
      const docRef = doc(this.firestore, `users/${uid}/entries/${entryId}`)
      return from(
        updateDoc(docRef, {
          updatedAt: serverTimestamp(),
          fields,
        })
      ).pipe(
        map( () => fields)
      );
    }
  }
}
