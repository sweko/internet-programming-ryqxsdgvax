import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from '../students/student-list/student-list.component';
import { StudentDetailsComponent } from '../students/student-details/student-details.component';
import { StudentEditComponent } from '../students/student-edit/student-edit.component';
import { StudentCreateComponent } from '../students/student-create/student-create.component';
import { AboutComponent } from '../about/about.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { DegreesListComponent } from '../degrees/degrees-list/degrees-list.component';
import { CoursesListComponent } from '../courses/courses-list/courses-list.component';


const routes: Routes = [
  { path: 'students', component: StudentListComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'about', component: AboutComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'degrees', component: DegreesListComponent },
  { path: 'courses', component: CoursesListComponent },
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: '**', redirectTo: '/students' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }