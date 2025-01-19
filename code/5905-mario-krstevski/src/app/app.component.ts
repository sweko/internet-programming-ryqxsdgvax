import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Student Management System';

  constructor(private router: Router) {}

  viewStudents() {
    this.router.navigate(['/students']);
  }

  addStudent() {
    this.router.navigate(['/students/create']);
  }

  editStudent() {
    const studentId = 1; // Replace with actual logic to get the student ID
    this.router.navigate([`/students/edit/${studentId}`]);
  }

  manageCourses() {
    this.router.navigate(['/courses']);
  }

  viewStatistics() {
    this.router.navigate(['/statistics']);
  }
}