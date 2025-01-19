import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  template: `
    <h1>Edit Student</h1>
    <form *ngIf="student" (ngSubmit)="updateStudent()">
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

      <button type="submit">Save</button>
      <button type="button" (click)="goBack()">Cancel</button>
    </form>
    <div *ngIf="!student">
      <p>Loading student details...</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StudentEditComponent implements OnInit {
  student: Student | undefined;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id).subscribe({
      next: (data: Student) => {
        this.student = data;
      },
      error: (err: any) => {
        console.error('Error fetching student details:', err);
      }
    });
  }

  updateStudent(): void {
    if (this.student) {
      this.studentService.updateStudent(this.student).subscribe({
        next: () => {
          alert('Student updated successfully.');
          this.router.navigate(['/students']);
        },
        error: (err: any) => {
          console.error('Error updating student:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
