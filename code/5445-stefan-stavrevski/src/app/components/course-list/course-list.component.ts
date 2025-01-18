import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class CourseListComponent implements OnInit {
  courses: any[] = [];
  filteredCourses: any[] = []; // New array for filtered courses
  semesters = ['Autumn', 'Spring'];
  years = [1, 2, 3, 4];
  filters = {
    semester: '',
    year: '',
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.apiService.getCourses().subscribe((data) => {
      this.courses = data; // Keep the original list intact
      this.filteredCourses = [...this.courses]; // Initially, show all courses
    });
  }

  applyFilters() {
    this.filteredCourses = this.courses.filter((course) => {
      return (
        (!this.filters.semester ||
          course.semester.toLowerCase() ===
            this.filters.semester.toLowerCase()) &&
        (!this.filters.year || course.yearOfStudy === +this.filters.year)
      );
    });
  }

  clearFilters() {
    this.filters.semester = '';
    this.filters.year = '';
    this.filteredCourses = [...this.courses]; // Reset to show all courses
  }
}
