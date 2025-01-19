// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { StudentEditComponent } from './pages/student-edit/student-edit.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },

  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent }
];