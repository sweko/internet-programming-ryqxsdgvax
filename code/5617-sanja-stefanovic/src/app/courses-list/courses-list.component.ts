import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service'; // Correct path to CourseService
import { Router } from '@angular/router'; // Correct import for Router

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses: any[] = [];

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
      },
      (error: any) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  viewCourse(id: number): void {
    this.router.navigate(['/courses', id]);
  }

  // Additional methods for editing and deleting courses can be added here
}
