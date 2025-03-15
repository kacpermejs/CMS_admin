import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { UserRole } from '@core/models/UserRole';
import { Store } from '@ngrx/store';
import { credentialsLoading, credentialsLoadingFailure, credentialsLoadingSuccess, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess } from 'app/store/actions/user.actions';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = inject(Auth);
  private store = inject(Store);

  constructor() {
    // Handle persisted auth state on app initialization
    this.checkAuthState();
  }

  // Method to check auth state when the app initializes or page is refreshed
  checkAuthState(): void {
    this.store.dispatch(credentialsLoading());

    authState(this.auth).subscribe(user => {
      if (user) {
        // User is signed in
        const userRole: UserRole = this.getUserRole(user);
        this.store.dispatch(credentialsLoadingSuccess({userRole}));
      } else {
        // No user is signed in
        this.store.dispatch(credentialsLoadingFailure({error: "Could not load credentials!"}));
      }
    });
  }

  signInWithGoogle() {

    const provider = new GoogleAuthProvider();

    return signInWithPopup(this.auth, provider).then((userCredential) => {
      console.log("Signed in with google!");
      console.log(userCredential);
      if (userCredential.user) {
        this.storeSuccessfulLogin(userCredential.user);
      } else {
        this.store.dispatch(loginFailure({ error: "Error signing in with google!" }));
      }
    });
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.storeSuccessfulLogin(userCredential.user);
        console.log('User signing in:', userCredential);
      })
      .catch(error => {
        this.store.dispatch(loginFailure({ error: error.message }));
        console.error('Error signing in:', error);
        throw error;
      });
  }

  registerWithEmailAndPassword(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.storeSuccessfulLogin(userCredential.user);
        console.log('User signed up:', userCredential);
      })
      .catch(error => {
        this.store.dispatch(loginFailure({ error: error.message }));
        console.error('Error signing up:', error);
        throw error;
      });
  }

  getAuthState(): Observable<any> {
    return authState(this.auth);
  }

  getUserUid(): Observable<string> {
    return (authState(this.auth) as Observable<any>).pipe(
      map(e => e ? e.uid : "")
    );
  }

  signOut() {
    this.store.dispatch(logout());

    return signOut(this.auth).then(() => {
      this.store.dispatch(logoutSuccess());
      console.log('User signed out:');
    })
    .catch(error => {
      this.store.dispatch(logoutFailure({ error: error.message }));
      console.error('Error signing out:', error);
      throw error;
    });
  }

  private getUserRole(user: User): UserRole {
    return UserRole.Client; // TODO Assuming all users are clients for simplicity
  }

  private storeSuccessfulLogin(user: User) {
    const userRole: UserRole = this.getUserRole(user); // You can use any logic to derive the user's role
    this.store.dispatch(loginSuccess({ userRole }));
  }
}
