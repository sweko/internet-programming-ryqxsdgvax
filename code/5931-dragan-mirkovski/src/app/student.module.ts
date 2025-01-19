import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';



@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    StudentCreateComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [
    StudentListComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    StudentCreateComponent,
  ],
})
export class StudentModule {}
