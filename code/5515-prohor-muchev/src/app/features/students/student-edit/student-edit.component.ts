import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Student } from '../../../shared/interfaces';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-container" *ngIf="student">
      <h2>Edit Student</h2>
      <form (ngSubmit)="onSubmit()" #studentForm="ngForm">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" 
                 [(ngModel)]="student.firstName" required>
        </div>
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" 
                 [(ngModel)]="student.lastName" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" 
                 [(ngModel)]="student.email" required email>
        </div>
        <div class="form-group">
          <label for="degree">Degree</label>
          <input type="text" id="degree" name="degree" 
                 [(ngModel)]="student.degree" required>
        </div>
        <div class="form-group">
          <label for="year">Year</label>
          <input type="number" id="year" name="year" 
                 [(ngModel)]="student.year" required min="1" max="4">
        </div>
        <div class="actions">
          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-container {
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
    }
    .form-group input {
      width: 100%;
      padding: var(--spacing-sm);
    }
    .actions {
      display: flex;
      gap: var(--spacing-md);
      margin-top: var(--spacing-lg);
    }
  `]
})
export class StudentEditComponent implements OnInit {
  student?: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent(id);
  }

  loadStudent(id: number) {
    this.dataService.getStudent(id).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (error) => {
        console.error('Error loading student:', error);
      }
    });
  }

  onSubmit() {
    if (!this.student) return;
    
    this.dataService.updateStudent(this.student.id, this.student).subscribe({
      next: () => {
        this.router.navigate(['/students', this.student?.id]);
      },
      error: (error) => {
        console.error('Error updating student:', error);
      }
    });
  }

  cancel() {
    if (this.student) {
      this.router.navigate(['/students', this.student.id]);
    } else {
      this.router.navigate(['/students']);
    }
  }
}

export default StudentEditComponent; 