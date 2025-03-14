import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from './core/config/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CMS_admin';

  configService = inject(ConfigService);

  constructor() {
    this.configService
      .setConfig()
      .then(() =>
        console.log(`App is running in ${this.configService.readConfig().Environment} environment!`)
      )
  }
}
