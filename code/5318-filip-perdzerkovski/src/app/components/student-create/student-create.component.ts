import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  template: `
    <h1>Create New Student</h1>
    <form (ngSubmit)="createStudent()">
      <label for="firstName">First Name:</label>
      <input id="firstName" [(ngModel)]="student.firstName" name="firstName" required />

      <label for="lastName">Last Name:</label>
      <input id="lastName" [(ngModel)]="student.lastName" name="lastName" required />

      <label for="email">Email:</label>
      <input id="email" [(ngModel)]="student.email" name="email" type="email" required />

      <label for="degree">Degree:</label>
      <input id="degree" [(ngModel)]="student.degree" name="degree" required />

      <label for="year">Year:</label>
      <input id="year" [(ngModel)]="student.year" name="year" type="number" required />

      <button type="submit">Create</button>
      <button type="button" (click)="goBack()">Cancel</button>
    </form>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentCreateComponent {
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    degree: '',
    year: 1
  };

  constructor(private studentService: StudentService, private router: Router) {}

  createStudent(): void {
    this.studentService.createStudent(this.student).subscribe({
      next: () => {
        alert('Student created successfully.');
        this.router.navigate(['/students']);
      },
      error: (err: any) => {
        console.error('Error creating student:', err);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
