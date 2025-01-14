import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'students',
    loadChildren: () => import('./features/students/students.routes')
      .then(m => m.STUDENT_ROUTES)
  },
  {
    path: 'statistics',
    loadComponent: () => import('./features/statistics/statistics.component')
      .then(m => m.StatisticsComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component')
      .then(m => m.AboutComponent)
  },
  {
    path: '',
    redirectTo: 'students',
    pathMatch: 'full'
  }
];
