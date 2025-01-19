import { Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentCreateComponent } from './students/student-create/student-create.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentDetailsComponent } from './students/student-details/student-details.component';
import { AboutComponent } from './about/about.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DegreesListComponent } from './degrees/degrees-list/degrees-list.component';
import { CoursesListComponent } from './courses/courses-list/courses-list.component';

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
];
