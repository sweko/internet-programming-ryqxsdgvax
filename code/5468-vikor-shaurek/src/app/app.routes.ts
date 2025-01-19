
import { Routes } from '@angular/router';
import { StudentListComponent } from './pages/students-list/students-list.component';
import { DegreesListComponent } from './pages/degrees-list/degrees-list.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'degrees', component: DegreesListComponent },
  { path: 'courses', component: CoursesListComponent },
];
