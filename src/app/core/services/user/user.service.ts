import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc, docData, setDoc, getDoc } from '@angular/fire/firestore';
import { UserRole } from '@core/models/UserRole';
import { UserData } from '@core/store/models/UserState';
import { from, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore = inject(Firestore);

  constructor() {}

  setUserData(userUid: string, userData: Partial<UserData>): Observable<void> {
    if (!userUid) throw new Error('User UID is required');
    
    let newUser = {
      ...userData,
    }
    if(!newUser.role || newUser.role == UserRole.Guest)
      newUser.role = UserRole.Client;
    
    console.log('Using user data: ', newUser);
    console.log('Trying to write to: users/' + userUid);

    const userDocRef = doc(this.firestore, `users/${userUid}`);
    return from(setDoc(userDocRef, newUser, { merge: true }));
  }

  getUserData(userUid: string): Observable<UserData> {
    if (!userUid) return throwError(() => new Error('User UID is required'));
    const userDocRef = doc(this.firestore, `users/${userUid}`);
    return from(getDoc(userDocRef)).pipe(
      map((docSnapshot) => {
        if (!docSnapshot.exists()) {
          throw new Error('User data not found');
        }
        return docSnapshot.data() as UserData;
      })
    );
  }
}
