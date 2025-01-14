import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../services.service';
import { Student } from '../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-student-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-student-create.component.html',
  styleUrl: './student-student-create.component.css'
})
export class StudentStudentCreateComponent {
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    studentId: '',
    dateOfBirth: '',
    email: '',
    degree: '',
    year: 1,
    courses: []
  };

  constructor(private service: Service, private router: Router) { }

  onSubmit(): void {
    this.service.createStudent(this.student).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}
