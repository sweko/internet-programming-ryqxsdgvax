import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseAddComponent } from './course-add/course-add.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { DegreeListComponent } from './degree-list/degree-list.component';
import { DegreeAddComponent } from './degree-add/degree-add.component';
import { DegreeDetailComponent } from './degree-detail/degree-detail.component';
import { DegreeEditComponent } from './degree-edit/degree-edit.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'student-add', component: StudentAddComponent },
  { path: 'student-detail/:id', component: StudentDetailComponent},
  { path: 'student-edit/:id', component: StudentEditComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'course-add', component: CourseAddComponent },
  { path: 'course-detail/:id', component: CourseDetailComponent},
  { path: 'course-edit/:id', component: CourseEditComponent },
  { path: 'degrees', component: DegreeListComponent },
  { path: 'degree-add', component: DegreeAddComponent },
  { path: 'degree-detail/:id', component: DegreeDetailComponent},
  { path: 'degree-edit/:id', component: DegreeEditComponent },
  { path: 'statistic', component: StatisticComponent},
  { path: 'about', component: AboutComponent},
  { path: '**', redirectTo: '/students' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }