import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, catchError, of, tap, map } from 'rxjs';

// Config Interfaces
export interface AppConfig {
  Environment: string;
}

export interface SecretsConfig {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private config = signal<AppConfig | null>(null);
  private secrets = signal<SecretsConfig | null>(null);

  constructor() {}

  // Load both app-config.json & secrets.json
  loadConfig(): Observable<void> {
    return forkJoin({
      config: this.http.get<AppConfig>('./app-config.json').pipe(
        catchError((err) => {
          console.error('Failed to load app-config.json:', err);
          return of({ Environment: 'DEV' } as AppConfig);
        })
      ),
      secrets: this.http.get<SecretsConfig>('./secrets.json').pipe(
        catchError((err) => {
          console.error('Failed to load secrets.json:', err);
          return of(null);
        })
      ),
    }).pipe(
      // Store config values in signals
      tap(({ config, secrets }) => {
        if (!secrets) throw new Error('Secrets file is missing!');
        this.config.set(config);
        this.secrets.set(secrets);
      }),
      map(() => void 0)
    );
  }

  getConfig() {
    return this.config();
  }

  getSecrets() {
    return this.secrets();
  }
}
