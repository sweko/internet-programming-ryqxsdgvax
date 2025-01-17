import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student, Course, Degree } from '../../../models/student';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgForOf, NgIf } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatSelect,
    MatOption,
    NgForOf,
    MatMiniFabButton,
    MatButton,
    MatIcon,
    MatError,
    MatLabel
  ],
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | undefined;
  degrees: Degree[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1)]],
    });
  }


  ngOnInit() {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe(student => {
        this.studentForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          degree: student.degree,
          year: student.year
        });

      });
    }

    this.studentService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });
  }

  onSubmit() {
    if (this.studentForm.valid && !this.isSubmitting && this.studentId) {
      this.isSubmitting = true;

      const formValue = this.studentForm.value;

      this.studentService.getStudentById(this.studentId).subscribe(existingStudent => {
        const studentData: Student = {
          ...existingStudent,
          ...formValue,
          id: this.studentId
        };
          if(this.studentId){
            this.studentService.updateStudent(this.studentId, studentData).subscribe({
              next: (updatedStudent) => {
                this.router.navigate(['/students', updatedStudent.id]);
              },
              error: (error) => {
                console.error('Error saving student:', error);
                this.isSubmitting = false;
              },
              complete: () => {
                this.isSubmitting = false;
              }
            });
          }

      });
    }
  }
}
