import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Degree } from '../models/degree';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm!: FormGroup;
  degrees: Degree[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentsService: StudentsService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.fetchDegrees();
  }

  private initForm(): void {
    this.studentForm = this.fb.group({
      studentId: ['', [
        Validators.required, 
        Validators.pattern('^202[0-9]-[0-9]{4}$')
      ]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
  }

  fetchDegrees(): void {
    this.studentsService.getDegrees().subscribe({
      next: (degrees) => {
        this.degrees = degrees;
      },
      error: (error) => {
        console.error('Error fetching degrees:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;
      
      const newStudent: Student = {
        id: 0, // ID will be set by the backend
        studentId: formValues.studentId,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        degree: formValues.degree,
        year: parseInt(formValues.year),
        courses: []
      };
  
      this.studentsService.createStudent(newStudent).subscribe({
        next: (createdStudent) => {
          console.log('Student created successfully:', createdStudent);
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error creating student:', error);
        }
      });
    } else {
      console.log('Form is invalid:', this.studentForm.errors);
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.studentForm.get(controlName);
    if (control?.errors && (control.dirty || control.touched || this.submitted)) {
      if (control.errors['required']) return `${controlName} is required`;
      if (control.errors['email']) return 'Invalid email address';
      if (control.errors['minlength']) 
        return `${controlName} must be at least ${control.errors['minlength'].requiredLength} characters`;
      if (control.errors['pattern'] && controlName === 'studentId') 
        return 'Student ID must be in format: YYYY-XXXX';
    }
    return '';
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}