import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StudentDetailsComponent } from '../student-details/student-details.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'student-details/:id', component: StudentDetailsComponent }
    ])
  ]
})
export class StudentsModule { }
