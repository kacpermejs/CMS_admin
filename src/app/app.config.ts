import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, provideAppInitializer, inject } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";

import { provideEffects } from "@ngrx/effects";
import { provideStore, Store } from "@ngrx/store";
import { setLogLevel, LogLevel } from "@angular/fire";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

import { reducers, metaReducers } from "@core/store/reducer.registry";
import { effects } from "@core/store/effect.registry";
import { initApp } from "@core/store/actions/init.actions";
import { routes } from "./app.routes";
import { AppConfig, APP_CONFIG } from "@core/config/AppConfig";
import { Secrets, SECRETS_CONFIG } from "@core/config/SecretsConfig";

export function getAppConfig(config: { appConfig: AppConfig; secrets: Secrets; }): ApplicationConfig {
  const appConfig: ApplicationConfig = {
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
      provideFirestore(() => getFirestore()),
      provideEffects(effects),
      provideAppInitializer(() => {
        const store = inject(Store);
        store.dispatch(initApp());
      }),
    ]
  }
  //Suppressing firebase injection context warnings
  setLogLevel(LogLevel.SILENT);

  return appConfig;
}