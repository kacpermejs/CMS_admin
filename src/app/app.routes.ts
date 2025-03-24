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
  {
    path: 'fill-user-data',
    loadComponent: () =>
      import('./features/user-data-form/user-data-form.component').then((m) => m.UserDataFormComponent),
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
    path: 'content-models',
    canActivate: [clientAuthGuard],
    canActivateChild: [clientAuthGuard],
    loadComponent: () =>
      import('./features/content-models/content-models.component').then(
        (m) => m.ContentModelsComponent
      ),
    loadChildren: () =>
      import('./features/content-models/content-models.routes').then(
        (m) => m.CONTENT_MODELS_ROUTES
      ),
  },
  {
    path: 'content-entries',
    canActivate: [clientAuthGuard],
    canActivateChild: [clientAuthGuard],
    loadComponent: () =>
      import('./features/content-entries/content-entries.component').then(
        (m) => m.ContentEntriesComponent
      ),
    loadChildren: () =>
      import('./features/content-entries/content-entires.routes').then(
        (m) => m.CONTENT_ENTRIES_ROUTES
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
