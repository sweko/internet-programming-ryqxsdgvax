import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  {
    path: 'students',
    loadChildren: () => import('./features/students/students.routes')
      .then(m => m.STUDENT_ROUTES),
    title: 'Students'
  },
  {
    path: 'degrees',
    loadChildren: () => import('./features/degrees/degrees.routes')
      .then(m => m.DEGREE_ROUTES),
    title: 'Degrees'
  },
  { path: 'courses', loadChildren: () => import('./features/courses/courses.routes').then(m => m.COURSE_ROUTES) },
  { path: 'statistics', loadComponent: () => import('./features/statistics/statistics.component').then(m => m.StatisticsComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: '**', redirectTo: 'students' }
];
