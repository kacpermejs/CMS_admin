import { APP_INITIALIZER, enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideStore, Store } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideZoneChangeDetection } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { routes } from 'app/app.routes';
import { metaReducers, reducers } from '@core/store/reducer.registry';
import { APP_CONFIG, AppConfig } from '@core/config/AppConfig';
import { SECRETS_CONFIG, Secrets } from '@core/config/SecretsConfig';
import { provideEffects } from '@ngrx/effects';
import { effects } from '@core/store/effect.registry';
import { initApp } from '@core/store/actions/init.actions';

async function loadConfig() {
  const [appConfigRes, secretsRes] = await Promise.all([
    fetch('app-config.json'),
    fetch('secrets.json')
  ]);

  const appConfig = await appConfigRes.json();
  const secrets = await secretsRes.json();

  return { appConfig, secrets };
}

export const FIREBASE_CONFIG = new InjectionToken<any>('FIREBASE_CONFIG');

async function initializeAppConfig(): Promise<{appConfig: AppConfig, secrets: Secrets}> {
  const { appConfig, secrets } = await loadConfig();

  if (appConfig.Environment === 'PROD') {
    enableProdMode();
  }

  // Initialize Firebase with secrets from secrets.json
  return { appConfig, secrets };
}

initializeAppConfig().then((config) => {
  bootstrapApplication(AppComponent, {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, withComponentInputBinding(), withRouterConfig({
        paramsInheritanceStrategy: 'always'
      })),
      provideHttpClient(),
      provideStore(reducers, { metaReducers }),
      { provide: APP_CONFIG, useValue: { Environment: config.appConfig.Environment } },
      { provide: SECRETS_CONFIG, useValue: { firebase: config.secrets.firebase } },
      provideFirebaseApp(() => initializeApp(config.secrets.firebase)),
      provideAuth(() => getAuth()),
      provideEffects(effects),
      {
        provide: APP_INITIALIZER,
        useFactory: (store: Store) => () => {
          store.dispatch(initApp()); // Dispatch the initApp action immediately after app initialization
        },
        deps: [Store],
        multi: true,
      }
    ]
  }).catch((err) => console.error('Bootstrap failed:', err));
});