import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/students', pathMatch: 'full' },
    { path: 'students', component: StudentListComponent },
    { path: 'students/:id', component: StudentDetailsComponent },
    { path: 'students/:id/edit', component: StudentEditComponent },
    { path: 'students/create', component: StudentCreateComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'about', component: AboutComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
