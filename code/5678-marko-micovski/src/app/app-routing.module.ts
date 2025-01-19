import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentsListComponent } from './students-list/students-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentsListComponent },
  { path: 'students/create', component: StudentCreateComponent },
  { path: 'students/:id', component: StudentDetailsComponent },
  { path: 'students/:id/edit', component: StudentEditComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
