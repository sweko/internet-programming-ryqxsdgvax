import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentsStatisticsComponent } from './statistics-page/statistics-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { StudentEditComponent } from './student-edit/student-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { path: 'students', component: StudentListComponent },
    { path: 'statistics', component: StudentsStatisticsComponent},
    { path: 'about', component: AboutPageComponent },
    { path: '**', redirectTo: 'students' }

];
