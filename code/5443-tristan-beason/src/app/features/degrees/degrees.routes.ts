import { Routes } from '@angular/router';

export const DEGREE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./degree-list/degree-list.component').then(m => m.DegreeListComponent)
  }
]; 