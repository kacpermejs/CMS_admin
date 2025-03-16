import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER, provideAppInitializer, inject } from "@angular/core";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { AppConfig, APP_CONFIG } from "@core/config/AppConfig";
import { Secrets, SECRETS_CONFIG } from "@core/config/SecretsConfig";
import { initApp } from "@core/store/actions/init.actions";
import { effects } from "@core/store/effect.registry";
import { reducers, metaReducers } from "@core/store/reducer.registry";
import { provideEffects } from "@ngrx/effects";
import { provideStore, Store } from "@ngrx/store";
import { routes } from "./app.routes";

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
      provideEffects(effects),
      provideAppInitializer(() => {
        const store = inject(Store);
        store.dispatch(initApp());
      }),
    ]
  }
  return appConfig;
}