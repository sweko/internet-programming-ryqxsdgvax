import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  template: `
    <h1>Student Details</h1>
    <div *ngIf="student">
      <p><strong>ID:</strong> {{ student.id }}</p>
      <p><strong>Name:</strong> {{ student.firstName }} {{ student.lastName }}</p>
      <p><strong>Email:</strong> {{ student.email }}</p>
      <p><strong>Degree:</strong> {{ student.degree }}</p>
      <p><strong>Year:</strong> {{ student.year }}</p>
      <button (click)="goBack()">Back</button>
    </div>
    <div *ngIf="!student">
      <p>Loading student details...</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class StudentDetailsComponent implements OnInit {
  student: Student | undefined;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
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

  goBack(): void {
    window.history.back();
  }
}
