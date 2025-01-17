import { Routes } from '@angular/router';
import {StudentListComponent} from './students/student-list/student-list.component';
import {CreateStudentComponent} from './students/create-student/create-student.component';
import {StudentDetailsComponent} from './students/student-details/student-details.component';
import {EditStudentComponent} from './students/edit-student/edit-student.component';
import {AboutComponent} from './about/about.component';
import {StatisticsComponent} from './statistics/statistics.component';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/create', component: CreateStudentComponent },
  { path: 'students/:id', component: StudentDetailsComponent,},
  { path: 'students/:id/edit', component: EditStudentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: 'authors', pathMatch: 'full' },
];
