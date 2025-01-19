import { Routes } from '@angular/router';
import { HomeComponent } from './students/home/home.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { DegreesComponent } from './degrees/degrees/degrees.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { StatisticsComponent } from './statistics/statistics/statistics.component';
import { AboutComponent } from './about/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: HomeComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'degrees', component: DegreesComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/students' },
];
