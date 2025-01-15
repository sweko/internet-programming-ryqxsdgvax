import { Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';
import { DegreeComponent } from './components/degree/degree.component';
import { CourseComponent } from './components/course/course.component';
import { StudentFormComponent } from './components/student-form/student-form.component';

export const routes: Routes = [
    {path:'',redirectTo: '/students',pathMatch:'full'},
    {path:'students',component:StudentsListComponent},
    {path:'students/create',component:StudentFormComponent},
    {path:'students/:id',component:ViewStudentComponent},
    {path:'students/:id/edit',component:StudentFormComponent},
    {path:'statistics',component:StatisticsComponent},
    {path:'about',component:AboutComponent},
    {path:'degrees',component:DegreeComponent},
    {path:'courses',component:CourseComponent},
];
