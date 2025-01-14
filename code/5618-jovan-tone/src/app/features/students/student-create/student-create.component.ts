import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Student } from '../../../models/student.interface';
import { Degree } from '../../../models/degree.interface';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {
  studentForm: FormGroup;
  degrees: Degree[] = [];
  saving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDegrees();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      year: [1, [Validators.required, Validators.min(1), Validators.max(4)]]
    });
  }

  private loadDegrees(): void {
    this.apiService.getDegrees().subscribe({
      next: (degrees) => this.degrees = degrees.filter(d => d.active),
      error: (error) => console.error('Error loading degrees:', error)
    });
  }

  private generateStudentId(): string {
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${year}-${random}`;
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    this.saving = true;
    const newStudent: Omit<Student, 'id'> = {
      ...this.studentForm.value,
      studentId: this.generateStudentId(),
      courses: []
    };

    this.apiService.createStudent(newStudent).subscribe({
      next: (student) => {
        this.router.navigate(['/students', student.id]);
      },
      error: (error) => {
        console.error('Error creating student:', error);
        this.saving = false;
      }
    });
  }
} 