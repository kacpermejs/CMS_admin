import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  APP_INITIALIZER,
  provideAppInitializer,
  inject,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { provideEffects } from '@ngrx/effects';
import { provideStore, Store } from '@ngrx/store';
import { setLogLevel, LogLevel } from '@angular/fire';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { reducers, metaReducers } from '@core/store/reducer.registry';
import { effects } from '@core/store/effect.registry';
import { initApp } from '@core/store/actions/init.actions';
import { routes } from './app.routes';
import { AppConfig, APP_CONFIG } from '@core/config/AppConfig';
import { Secrets, SECRETS_CONFIG } from '@core/config/SecretsConfig';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { getStorage, provideStorage } from '@angular/fire/storage';

export function getAppConfig(config: {
  appConfig: AppConfig;
  secrets: Secrets;
}): ApplicationConfig {

  const MyPreset = definePreset(Aura, {
    semantic: {
      primary: {
        50: '{blue.50}',
        100: '{blue.100}',
        200: '{blue.200}',
        300: '{blue.300}',
        400: '{blue.400}',
        500: '{blue.500}',
        600: '{blue.600}',
        700: '{blue.700}',
        800: '{blue.800}',
        900: '{blue.900}',
        950: '{blue.950}',
      },
      danger: {
        50: '{red.50}',
        100: '{red.100}',
        200: '{red.200}',
        300: '{red.300}',
        400: '{red.400}',
        500: '{red.500}',
        600: '{red.600}',
        700: '{red.700}',
        800: '{red.800}',
        900: '{red.900}',
        950: '{red.950}',
      },
    },
  });

  const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(
        routes,
        withComponentInputBinding(),
        withRouterConfig({
          paramsInheritanceStrategy: 'always',
        })
      ),
      provideHttpClient(),
      provideStore(reducers, { metaReducers }),
      {
        provide: APP_CONFIG,
        useValue: { Environment: config.appConfig.Environment },
      },
      {
        provide: SECRETS_CONFIG,
        useValue: { firebase: config.secrets.firebase },
      },
      provideFirebaseApp(() => initializeApp(config.secrets.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage()),
      provideEffects(effects),
      provideAppInitializer(() => {
        const store = inject(Store);
        store.dispatch(initApp());
      }),
      provideAnimationsAsync(),
      providePrimeNG({
        theme: {
          preset: MyPreset,
          options: {
            prefix: 'p',
            darkModeSelector: '.dark',
            cssLayer: {
              name: 'primeng',
              order: 'theme, base, primeng'
            },
          },
        },
      }),
    ],
  };
  //Suppressing firebase injection context warnings
  setLogLevel(LogLevel.SILENT);

  return appConfig;
}
