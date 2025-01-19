import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  standalone: true,
  imports: [CommonModule], // Ensure CommonModule is imported
})
export class CoursesComponent {
  courses = [
    {
      id: 1,
      name: 'Introduction to Programming',
      code: 'CS101',
      semester: 'Autumn',
      yearOfStudy: 1,
    },
    {
      id: 2,
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      semester: 'Spring',
      yearOfStudy: 2,
    },
    {
      id: 3,
      name: 'Literary Analysis',
      code: 'EN101',
      semester: 'Autumn',
      yearOfStudy: 1,
    },
  ];
}
