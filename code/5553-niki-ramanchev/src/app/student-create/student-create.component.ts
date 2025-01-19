import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class StudentCreateComponent {
  student = {
    id: 0, 
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    degree: '',
    year: 1,
    dateOfBirth: '',
    courses: [],
  };

  degrees = ['CS', 'SE', 'IT', 'DS', 'CE']; 
  errorMessage = '';

  constructor(private studentService: StudentService, private router: Router) {}

  createStudent(): void {
    this.studentService.createStudent(this.student).subscribe({
      next: () => this.router.navigate(['/students']),
      error: (err) => {
        this.errorMessage = 'Failed to create student. Please try again later.';
        console.error(err);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/students']);
  }
}
