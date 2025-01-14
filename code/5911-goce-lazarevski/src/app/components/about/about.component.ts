import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Student } from '../../models/student';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  student: Student = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    studentId: 12345,
    dateOfBirth: "17.03.1995",
    email: "john@doe.com",
    degree: "SE",
    year: 3,
    courses: []
  };
}
