import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { Course } from '../models/grade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: false,
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit{
  course: Course | undefined
  constructor(private route: ActivatedRoute, private router: Router, private courseservice: CoursesService) { }
  ngOnInit(): void {
    this.getCourseDetails();
  }
  getCourseDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.courseservice.getCourseById(+id).subscribe((course: Course| undefined) => {
        this.course = course;
      });
    }
  }
  goToCourseList(): void {
    this.router.navigate(['/courses']);
  }
}
