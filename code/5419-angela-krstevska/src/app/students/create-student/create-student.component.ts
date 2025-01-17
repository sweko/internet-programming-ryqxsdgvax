import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {Degree, Student} from '../../../models/student';
import {StudentService} from '../../services/student.service';
@Component({
  selector: 'app-create-student',
  imports: [
    MatFormFieldModule,
    MatInput,
    MatSelect,
    MatOption,
    MatCard,
    MatCardContent,
    MatDatepickerModule,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  studentForm: FormGroup;
  degrees: Degree[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      dateOfBirth: ['', [Validators.required, this.pastDateValidator()]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
  }

  ngOnInit() {
    this.studentService.getDegrees().subscribe({
      next: (degrees) => {
        this.degrees = degrees;
      },
      error: (error) => {
        console.error('Error fetching degrees:', error);
      }
    });
  }

  private pastDateValidator() {
    return (control: any) => {
      if (!control.value) return null;
      const date = new Date(control.value);
      const today = new Date();
      return date > today ? { futureDate: true } : null;
    };
  }

  private formatDate(date: string ): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  onSubmit() {
    if (this.studentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.studentForm.value;
      const studentData = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        studentId: formValue.studentId,
        dateOfBirth: this.formatDate(formValue.dateOfBirth),
        email: formValue.email,
        degree: formValue.degree,
        year: formValue.year,
        courses: []
      };
      console.log(studentData);
      this.studentService.createStudent(studentData).subscribe({
        next: (savedStudent) => {
          this.router.navigate(['/students', savedStudent.id]);
        },
        error: (error) => {
          console.error('Error creating student:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
