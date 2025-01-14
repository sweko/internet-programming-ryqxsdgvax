import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/grade';

@Component({
  selector: 'app-course-add',
  standalone: false,
  templateUrl: './course-add.component.html',
  styleUrl: './course-add.component.css'
})
export class CourseAddComponent implements OnInit{
  newCourse: Course = {id: 0, name: '', code: '', semester: '', yearofStudy: 0}
  course: Course[] = [];
  constructor(private courseService: CoursesService, private router: Router) {}
 ngOnInit(): void {
   this.getCourses();
 }
 addCourse(): void {
   this.courseService.addCourse(this.newCourse).subscribe(() => {
     this.router.navigate(['/courses']);
   });
 }
 goToCourseList(): void {
   this.router.navigate(['/courses']);
 }
getCourses(): void {
 this.courseService.getCourses().subscribe((course) => {
   this.course = course;
 });
}
}
