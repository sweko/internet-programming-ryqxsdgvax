import { Component, OnInit } from '@angular/core';
import { Course } from '../models/grade';
import { CoursesService } from '../services/courses.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  courses: Course[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  namefilter: string = '';
  semestarfilter: string = '';
  semestarloaded: boolean = false
  constructor(private courseService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }
  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.courses.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.courses.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  getCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(courses);
    });
  }

  applyFilters(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses= this.filterCourses(courses);
    });
  }

  filterCourses(courses: Course[]): Course[] {
    return courses.filter(course =>
      this.filterBySemestar(course)
    )
  }

  filterBySemestar(course: Course): boolean {
    return this.semestarfilter === '' || course.semester.toLowerCase().includes(this.semestarfilter.toLowerCase());
  }

  viewCourseDetails(course: Course): void {
    this.router.navigate(['/course-detail', course.id]);
  }

  ediCourse(course: Course): void {
    this.router.navigate(['/course-edit', course.id]);
  }

  deleteCourse(course: Course): void {
    if (confirm('Do you want to delete the course')) {
      this.courseService.deleteCourse(course.id).subscribe(() => {
        this.getCourses();
      });
    }
  }
}
