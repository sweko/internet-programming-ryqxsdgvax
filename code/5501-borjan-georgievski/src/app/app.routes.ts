import { Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentDetailsComponent } from './students-details/students-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StatisticsComponent } from './statistics/statistics.component'; 
import { AboutComponent } from './about/about.component';  

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'statistics', component: StatisticsComponent },  
  { path: 'about', component: AboutComponent }  
];
