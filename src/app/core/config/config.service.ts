import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//Move this type to a shared folder
export interface AppConfig {
  Environment: string;
  Cognito: CognitoConfig;
  backEndIpAddress: string
  backEndPort: number
}

export interface CognitoConfig {
  region: string;
  userPoolId: string
  userPoolClientId: string
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //Default, if config files missing
  private configuration: AppConfig = {
    Environment: 'DEV',
    Cognito: {
      region: "",
      userPoolId: "",
      userPoolClientId: ""
    },
    backEndIpAddress: "localhost",
    backEndPort: 8080
  };

  private http: HttpClient;
  constructor() {
    this.http = inject(HttpClient)
  }

  //This function will get the current config for the environment
  setConfig(): Promise<void | AppConfig> {
    return firstValueFrom(this.http.get<AppConfig>('./app-config.json'))
      .then((config: AppConfig) => (this.configuration = config))
      .catch(error => {
        console.error(error);
      });
  }

  //We're going to use this function to read the config.
  readConfig(): AppConfig {
    return this.configuration;
  }
}