import { Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { ViewStudentComponent } from './components/view-student/view-student.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path:'',redirectTo: '/students',pathMatch:'full'},
    {path:'students',component:StudentsListComponent},
    {path:'students/create',component:AddStudentComponent},
    {path:'students/:id',component:ViewStudentComponent},
    {path:'students/:id/edit',component:UpdateStudentComponent},
    {path:'statistics',component:StatisticsComponent},
    {path:'about',component:AboutComponent},
];
