import { InjectionToken } from "@angular/core";

export interface AppConfig {
  Environment: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('AppConfig');