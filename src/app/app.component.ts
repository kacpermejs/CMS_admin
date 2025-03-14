import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './core/config/config.service';
import { FirebaseApp } from '@angular/fire/app';
import { Auth, getAuth } from '@angular/fire/auth';
import { Firestore, getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CMS_admin';

  configService = inject(ConfigService);
  private app: FirebaseApp;
  private auth: Auth;
  private firestore: Firestore;

  constructor() {
    this.app = inject(FirebaseApp);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);
  }

  ngOnInit(): void {

    // Quick check to log if Firebase has been initialized
    if (this.app) {
      console.log('Firebase initialized:', this.app.name); // Should log '[DEFAULT]' if initialized correctly
    } else {
      console.error('Firebase initialization failed!');
    }

    // Optional: Check Auth
    if (this.auth) {
      console.log('Firebase Auth initialized:', this.auth);
    } else {
      console.error('Firebase Auth initialization failed!');
    }

    // Optional: Check Firestore
    if (this.firestore) {
      console.log('Firestore initialized:', this.firestore);
    } else {
      console.error('Firestore initialization failed!');
    }
  }
}
