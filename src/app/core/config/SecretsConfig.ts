import { InjectionToken } from "@angular/core";

export interface Secrets {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export const SECRETS_CONFIG = new InjectionToken<Secrets>('SecretsConfig');
