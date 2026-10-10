import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/reader/reader').then((m) => m.Reader),
  },
  {
    path: '**',
    loadComponent: () => import('@features/reader/reader').then((m) => m.Reader),
  },
];
