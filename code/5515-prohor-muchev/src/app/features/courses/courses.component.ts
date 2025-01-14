import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Course } from '../../shared/interfaces';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="courses-container">
      <h2>Courses List</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Year of Study</th>
              <th>Semester</th>
            </tr>
          </thead>
          <tbody>
            @for (course of courses; track course.id) {
              <tr>
                <td>{{ course.code }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.yearOfStudy }}</td>
                <td>{{ course.semester }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .courses-container {
      padding: var(--spacing-md);
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      padding: var(--spacing-sm);
      border: 1px solid lightgray;
    }
  `]
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.dataService.getCourses().subscribe({
      next: (data) => {
        this.courses = data;
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      }
    });
  }
}

export default CoursesComponent; 