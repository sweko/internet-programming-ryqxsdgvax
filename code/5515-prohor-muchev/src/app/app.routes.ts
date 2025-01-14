import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  {
    path: 'students',
    loadComponent: () => import('./features/students/students.component')
      .then(m => m.default)
  },
  {
    path: 'students/create',
    loadComponent: () => import('./features/students/student-create/student-create.component')
      .then(m => m.default)
  },
  {
    path: 'students/:id',
    loadComponent: () => import('./features/students/student-detail/student-detail.component')
      .then(m => m.default)
  },
  {
    path: 'students/:id/edit',
    loadComponent: () => import('./features/students/student-edit/student-edit.component')
      .then(m => m.default)
  },
  {
    path: 'degrees',
    loadComponent: () => import('./features/degrees/degrees.component')
      .then(m => m.DegreesComponent)
  },
  {
    path: 'courses',
    loadComponent: () => import('./features/courses/courses.component')
      .then(m => m.CoursesComponent)
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
  }
];
