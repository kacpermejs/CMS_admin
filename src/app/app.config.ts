import { ApplicationConfig, inject, Injector, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './core/config/config.service';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';

export function initializeAppConfig(configService: ConfigService) {
  return () => configService.loadConfig(); // This will return an Observable/Promise, which is expected by provideAppInitializer
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({
        paramsInheritanceStrategy: 'always'
    })),
    provideHttpClient(),
    ConfigService,
    provideAppInitializer(() => initializeAppConfig(inject(ConfigService))()),
    {
        provide: 'FIREBASE_CONFIG',
        useFactory: (configService: ConfigService) => configService.getSecrets()?.firebase,
        deps: [ConfigService],
    },
    provideFirebaseApp((injector) => {
        const firebaseConfig = injector.get('FIREBASE_CONFIG');
        return initializeApp(firebaseConfig); // Initialize Firebase with the loaded config
    }),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStore(reducers, { metaReducers }),
    provideEffects([AuthEffects])
]
};
