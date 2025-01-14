import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  template: `
    <h1>Student List</h1>
    <button (click)="navigateToCreate()">Create New Student</button>
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Degree</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let student of students">
          <td>{{ student.id }}</td>
          <td>{{ student.firstName }} {{ student.lastName }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.degree }}</td>
          <td>{{ student.year }}</td>
          <td>
            <button (click)="viewStudent(student.id)">View</button>
            <button (click)="editStudent(student.id)">Edit</button>
            <button (click)="deleteStudent(student.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (err: any) => {
        console.error('Error fetching students');
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/students/create']);
  }

  viewStudent(id: number): void {
    this.router.navigate([`/students/${id}`]);
  }

  editStudent(id: number): void {
    this.router.navigate([`/students/${id}/edit`]);
  }

  deleteStudent(id: number): void {
    const confirmDelete = confirm(`Are you sure you want to delete student with ID: ${id}?`);
    if (confirmDelete) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== id);
          alert('Student deleted successfully.');
        },
        error: (err: any) => {
          console.error('Error deleting student:', err);
        }
      });
    }
  }
}
