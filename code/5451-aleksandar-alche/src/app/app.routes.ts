
import { Routes } from '@angular/router';
import { StudentListComponent } from './students/students.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentStudentCreateComponent } from './student-student-create/student-student-create.component';
import { StudentStudentEditComponent } from './student-student-edit/student-student-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/create', component: StudentStudentCreateComponent },
  { path: 'students/:id/edit', component: StudentStudentEditComponent },
  { path: '**', redirectTo: '/students' }
];