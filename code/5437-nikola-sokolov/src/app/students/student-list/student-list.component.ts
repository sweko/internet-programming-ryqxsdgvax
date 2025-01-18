import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngFor, *ngIf
import { RouterModule } from '@angular/router';  // Import RouterModule for routerLink

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],  // Add CommonModule and RouterModule here
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  errorMessage: string = '';

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data: any[]) => {
        this.students = data;
      },
      error: (err: any) => {
        this.errorMessage = 'Failed to load students';
        console.error(err);
      }
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.fetchStudents(), // Refresh the list after deletion
        error: (err) => console.error('Error deleting student:', err),
      });
    }
  }
}
