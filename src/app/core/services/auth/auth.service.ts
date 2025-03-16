import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { UserRole } from '@core/models/UserRole';
import { Store } from '@ngrx/store';
import { credentialsLoading, credentialsLoadingFailure, credentialsLoadingSuccess, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess } from '@core/store/actions/auth.actions';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth);

  constructor() {
  }

  // Method to check auth state when the app initializes or page is refreshed
  checkAuthState() {
    return authState(this.auth);
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, provider));
  }

  signInWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUpWithEmailAndPassword(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  getAuthState(): Observable<any> {
    return authState(this.auth);
  }

  signOut() {
    return from(signOut(this.auth));
  }
}
