import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
})
export class StudentCreateComponent implements OnInit {
  studentForm!: FormGroup;
  degrees: any[] = [];
  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchDegrees();
    this.fetchCourses();
  }

  initializeForm() {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      courses: [[]], // To select courses later
    });
  }

  fetchDegrees() {
    this.apiService.getDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }

  fetchCourses() {
    this.apiService.getCourses().subscribe((data) => {
      this.courses = data;
    });
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      this.apiService.createStudent(studentData).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Error creating student:', err);
        },
      });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
}
