import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  standalone: true,
  imports: [FormsModule] // Ensure FormsModule is imported
})
export class StudentCreateComponent {
  student: any = {
    firstName: '',
    lastName: '',
    studentId: '',
    dateOfBirth: '',
    email: '',
    degree: '',
    year: 1,
    courses: []
  };
  errorMessage: string = '';

  constructor(private studentService: StudentService, private router: Router) { }

  createStudent(): void {
    this.studentService.createStudent(this.student).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        this.errorMessage = 'Error creating student: ' + error.message;
      }
    });
  }
}
