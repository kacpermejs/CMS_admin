import { Routes } from '@angular/router';
import { clientAuthGuard } from '@core/guards/client-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  //client
  {
    path: 'dashboard',
    canActivate: [clientAuthGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'content-model',
    canActivate: [clientAuthGuard],
    canActivateChild: [clientAuthGuard],
    loadComponent: () =>
      import('./features/content-models/content-models.component').then(
        (m) => m.ContentModelsComponent
      ),
    loadChildren: () =>
      import('./features/content-models/content-models.routes').then(
        (m) => m.CONTENT_MODEL_ROUTES
      ),
  },
  //Fallback
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
