import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  template: `
    <h1>Statistics</h1>
    <div *ngIf="students.length > 0">
      <p><strong>Total Students:</strong> {{ totalStudents }}</p>
      <p><strong>Average Year of Study:</strong> {{ averageYear.toFixed(2) }}</p>
      <p><strong>Degrees Offered:</strong></p>
      <ul>
        <li *ngFor="let degree of degrees">{{ degree }}</li>
      </ul>
    </div>
    <div *ngIf="students.length === 0">
      <p>Loading statistics...</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class StatisticsComponent implements OnInit {
  students: Student[] = [];
  totalStudents: number = 0;
  averageYear: number = 0;
  degrees: string[] = [];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
        this.calculateStatistics();
      },
      error: (err: any) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  calculateStatistics(): void {
    this.totalStudents = this.students.length;
    this.averageYear =
      this.students.reduce((sum, student) => sum + student.year, 0) /
      this.totalStudents;
    this.degrees = [...new Set(this.students.map((student) => student.degree))];
  }
}
