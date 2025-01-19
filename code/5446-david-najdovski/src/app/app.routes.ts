import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { DegreesListComponent } from './degrees-list/degrees-list.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'degrees', component: DegreesListComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];
