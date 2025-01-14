import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';


const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/students' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
