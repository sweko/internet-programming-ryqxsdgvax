import { Routes } from '@angular/router';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { DegreesListComponent } from './components/degrees-list/degrees-list.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/students', pathMatch: 'full' },
    { path: 'students', component: StudentListComponent },
    { path: 'students/create', component: StudentCreateComponent },
    { path: 'students/:id', component: StudentDetailsComponent },
    { path: 'students/:id/edit', component: StudentEditComponent },
    { path: 'degrees', component: DegreesListComponent },
    { path: 'courses', component: CoursesListComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: '/students' } // Wildcard route for a 404 page
];