import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './app/pages/students-list/students-list.component';
import { StudentDetailsComponent } from './app/pages/student-details/student-details.component';
import { StudentEditComponent } from './app/pages/student-edit/student-edit.component';
import { StudentCreateComponent } from './app/pages/student-create/student-create.component';
import { DegreesComponent } from './app/pages/degrees-list/degrees-list.component';
import { CoursesComponent } from './app/pages/courses-list/courses-list.component';
import { StatisticsComponent } from './app/pages/statistics/statistics.component';
import { AboutComponent } from './app/pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'degrees', component: DegreesComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
