import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Student } from '../../shared/interfaces';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="header">
        <h2>Students</h2>
        <button class="btn btn-primary" (click)="addNewStudent()">Add New Student</button>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Degree</th>
            <th>Year</th>
            <th>Email</th>
            <th>Average Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          @for (student of students; track student.id) {
            <tr>
              <td>{{ student.studentId }}</td>
              <td>{{ student.firstName }} {{ student.lastName }}</td>
              <td>{{ student.degree }}</td>
              <td>{{ student.year }}</td>
              <td>{{ student.email }}</td>
              <td>{{ calculateAverageGrade(student) }}%</td>
              <td>
                <button class="btn btn-info btn-sm" (click)="viewStudent(student)">View</button>
                <button class="btn btn-warning btn-sm" (click)="editStudent(student)">Edit</button>
                <button class="btn btn-danger btn-sm" (click)="deleteStudent(student)">Delete</button>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .table {
      width: 100%;
      margin-bottom: 1rem;
      background-color: transparent;
      border-collapse: collapse;
    }
    .table th,
    .table td {
      padding: 0.75rem;
      vertical-align: middle;
      border-top: 1px solid #dee2e6;
    }
    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
    }
    .table tbody tr:nth-of-type(odd) {
      background-color: rgba(0, 0, 0, 0.05);
    }
    .btn-sm {
      padding: 0.25rem 0.5rem;
      font-size: 0.875rem;
      margin: 0 2px;
    }
  `]
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.dataService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
      error: (error) => {
        console.error('Error loading students:', error);
      }
    });
  }

  calculateAverageGrade(student: Student): string {
    const gradedCourses = student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return 'N/A';
    
    const sum = gradedCourses.reduce((acc, course) => 
      acc + (course.grade?.percentage || 0), 0);
    return (sum / gradedCourses.length).toFixed(2);
  }

  addNewStudent() {
    this.router.navigate(['/students/create']);
  }

  viewStudent(student: Student) {
    console.log('Viewing student:', student.id); 
    this.router.navigate(['/students', student.id.toString()]);
  }

  editStudent(student: Student) {
    console.log('Editing student:', student.id); 
    this.router.navigate(['/students', student.id.toString(), 'edit']);
  }

  deleteStudent(student: Student) {
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      this.dataService.deleteStudent(student.id).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.id !== student.id);
        },
        error: (error) => {
          console.error('Error deleting student:', error);
        }
      });
    }
  }
}

export default StudentsComponent; 