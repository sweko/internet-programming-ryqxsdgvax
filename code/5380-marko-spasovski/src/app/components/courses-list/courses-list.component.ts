import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-list',
  imports: [CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent {

  courses: Course[] = [];
  constructor(private coursesService: CoursesService){}


  ngOnInit(): void {
    this.coursesService.getCourses().subscribe((courses: Course[]) => {
      this.courses = courses;
    });
  }

}
