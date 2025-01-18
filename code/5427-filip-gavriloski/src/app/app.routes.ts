import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
  { path: 'students/:id', loadChildren: () => import('./students/student-detail/student-detail.module').then(m => m.StudentDetailModule) },
  { path: 'students/:id/edit', loadChildren: () => import('./students/student-edit/student-edit.module').then(m => m.StudentEditModule) },
  { path: 'students/create', loadChildren: () => import('./students/student-create/student-create.module').then(m => m.StudentCreateModule) },
  { path: 'degrees', loadChildren: () => import('./degrees/degrees.module').then(m => m.DegreesModule) },
  { path: 'courses', loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule) },
  { path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
];
