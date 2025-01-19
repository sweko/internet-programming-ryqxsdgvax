import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../models/grade';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-edit',
  imports: [],
  templateUrl: './course-edit.component.html',
  styleUrl: './course-edit.component.css'
})
export class CourseEditComponent implements OnInit{
  course: Course | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.getCourseDetails();
    this.getCourses();
  }
  getCourseDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.courseService.getCourseById(+id).subscribe((course) => {
        this.course = course;
      });
    }
  }
  getCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.course = this.course;
    });
  }
  saveChanges(): void {
    if (this.course) {
      this.courseService.updateCourse(this.course).subscribe(() => {
        this.router.navigate(['/courses', this.course!.id]);
      });
    }
 }
}
