import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.routes),
  },
  {
    path: 'shell',
    loadChildren: () => import('./app-shell/app-shell.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: 'shell',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.routes').then((m) => m.routes),
  },
];
