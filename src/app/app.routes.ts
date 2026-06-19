import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'templates',
    loadComponent: () => import('./pages/templates/templates').then(m => m.Templates),
  },
  {
    path: 'wizard/:id',
    loadComponent: () => import('./pages/wizard/wizard').then(m => m.Wizard),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
