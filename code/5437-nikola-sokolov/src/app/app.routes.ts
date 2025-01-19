import { Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },  // Default route
  { path: 'students', component: StudentListComponent },  // List of students
  { path: 'students/create', component: StudentCreateComponent },  // Create new student
  { path: 'students/:id', component: StudentDetailsComponent },  // Student details by ID
];
