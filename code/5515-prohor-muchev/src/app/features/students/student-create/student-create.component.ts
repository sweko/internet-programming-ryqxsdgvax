import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Student, Degree } from '../../../shared/interfaces';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="create-container">
      <h2>Create New Student</h2>
      <form (ngSubmit)="onSubmit()" #studentForm="ngForm">
        <div class="form-group">
          <label for="firstName">First Name*</label>
          <input type="text" class="form-control" id="firstName" name="firstName" 
                 [(ngModel)]="newStudent.firstName" required>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name*</label>
          <input type="text" class="form-control" id="lastName" name="lastName" 
                 [(ngModel)]="newStudent.lastName" required>
        </div>

        <div class="form-group">
          <label for="studentId">Student ID* (Format: YYYY-NNNN)</label>
          <input type="text" class="form-control" id="studentId" name="studentId" 
                 [(ngModel)]="newStudent.studentId" required pattern="\\d{4}-\\d{4}">
        </div>

        <div class="form-group">
          <label for="dateOfBirth">Date of Birth*</label>
          <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth" 
                 [(ngModel)]="newStudent.dateOfBirth" required>
        </div>

        <div class="form-group">
          <label for="email">Email*</label>
          <input type="email" class="form-control" id="email" name="email" 
                 [(ngModel)]="newStudent.email" required email>
        </div>

        <div class="form-group">
          <label for="degree">Degree*</label>
          <select class="form-control" id="degree" name="degree" 
                  [(ngModel)]="newStudent.degree" required>
            <option value="">Select a degree</option>
            @for (degree of degrees; track degree.code) {
              <option [value]="degree.code">{{ degree.name }}</option>
            }
          </select>
        </div>

        <div class="form-group">
          <label for="year">Year of Study* (1-4)</label>
          <input type="number" class="form-control" id="year" name="year" 
                 [(ngModel)]="newStudent.year" required min="1" max="4">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary" [disabled]="!studentForm.form.valid">
            Create Student
          </button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">
            Cancel
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-container {
      padding: var(--spacing-md);
      max-width: 600px;
      margin: 0 auto;
    }
    .form-group {
      margin-bottom: var(--spacing-md);
    }
    .form-group label {
      display: block;
      margin-bottom: var(--spacing-sm);
      font-weight: 500;
    }
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid black;
      border-radius: 4px;
      font-size: 16px;
    }
    .form-control:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
    }
    .form-actions {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-xl);
    }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .btn-primary {
      background-color: var(--primary);
      color: white;
    }
    .btn-primary:disabled {
      background-color: var(--bg-secondary);
      cursor: not-allowed;
    }
    .btn-secondary {
      background-color: var(--bg-secondary);
      color: var(--text-primary);
    }
  `]
})
export class StudentCreateComponent {
  newStudent: Partial<Student> = {
    courses: []
  };
  degrees: Degree[] = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    this.loadDegrees();
  }

  onSubmit() {
    this.dataService.createStudent(this.newStudent as Omit<Student, 'id'>).subscribe({
      next: () => {
        this.router.navigate(['/students']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Error creating student:', error);
      }
    });
  }

  loadDegrees() {
    this.dataService.getDegrees().subscribe({
      next: (data) => {
        this.degrees = data;
      },
      error: (error) => {
        console.error('Error loading degrees:', error);
      }
    });
  }

  cancel() {
    this.router.navigate(['/students']);
  }
}

export default StudentCreateComponent; 