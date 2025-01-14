import { Routes } from '@angular/router';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { DegreesComponent } from './components/degrees/degrees.component';
import { CoursesComponent } from './components/courses/courses.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  
  { path: '', redirectTo: '/students', pathMatch: 'full' },

  
  { path: 'students', component: StudentListComponent },

  
  { path: 'degrees', component: DegreesComponent },

  
  { path: 'courses', component: CoursesComponent },

  
  { path: 'statistics', component: StatisticsComponent },

  
  { path: 'about', component: AboutComponent },

  
  { path: '**', redirectTo: '/students' },
];
