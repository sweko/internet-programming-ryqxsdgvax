import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./student-list/student-list.component')
      .then(m => m.StudentListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./student-create/student-create.component')
      .then(m => m.StudentCreateComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./student-details/student-details.component')
      .then(m => m.StudentDetailsComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./student-edit/student-edit.component')
      .then(m => m.StudentEditComponent)
  }
]; 