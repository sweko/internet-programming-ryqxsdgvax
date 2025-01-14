import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DegreesComponent {
  degrees = [
    {
      id: 1,
      name: 'Bachelor of Science in Computer Science',
      code: 'CS',
      yearsToComplete: 4,
      active: true,
      percentage: 100, // Example percentage
    },
    {
      id: 2,
      name: 'Bachelor of Arts in English',
      code: 'EN',
      yearsToComplete: 3,
      active: true,
      percentage: 90,
    },
    {
      id: 3,
      name: 'Bachelor of Science in Mathematics',
      code: 'MATH',
      yearsToComplete: 4,
      active: false,
      percentage: 85,
    },
    {
      id: 4,
      name: 'Bachelor of Science in Physics',
      code: 'PHY',
      yearsToComplete: 4,
      active: true,
      percentage: 95,
    },
    {
      id: 5,
      name: 'Bachelor of Arts in Psychology',
      code: 'PSY',
      yearsToComplete: 3,
      active: true,
      percentage: 87,
    },
  ];
}
