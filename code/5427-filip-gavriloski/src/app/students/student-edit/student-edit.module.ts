import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { StudentEditComponent } from './student-edit.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule to imports
    RouterModule.forChild([{ path: '', component: StudentEditComponent }])
  ]
})
export class StudentEditModule { }
