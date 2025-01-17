import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent {
  newStudent: Student = {
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

  constructor(private studentService: StudentService, private router: Router) {}

  createStudent(): void {
    this.studentService.createStudent(this.newStudent).subscribe(
      (student) => {
        this.router.navigate(['/students', student.id]);
      },
      (error) => {
        console.error('Error creating student:', error);
      }
    );
  }
}
