import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppConfig } from '@core/config/AppConfig';
import { Secrets } from '@core/config/SecretsConfig';
import { getAppConfig } from 'app/app.config';

async function loadConfig() {
  const [appConfigRes, secretsRes] = await Promise.all([
    fetch('app-config.json'),
    fetch('secrets.json')
  ]);

  const appConfig: AppConfig = await appConfigRes.json();
  const secrets: Secrets = await secretsRes.json();

  return { appConfig, secrets };
}

async function initializeAppConfig(): Promise<{appConfig: AppConfig, secrets: Secrets}> {
  const { appConfig, secrets } = await loadConfig();

  if (appConfig.Environment === 'PROD') {
    enableProdMode();
  }

  return { appConfig, secrets };
}

initializeAppConfig().then((config) => {
  bootstrapApplication(AppComponent, getAppConfig(config))
    .catch((err) => console.error('Bootstrap failed:', err));
});
