import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student, Course, Grade } from '../models/grade';
import { CoursesService } from '../services/courses.service';
import { BehaviorSubject } from 'rxjs';
import { StudentsService } from '../services/students.service';
import { DegreesService } from '../services/degrees.service';

@Component({
  selector: 'app-statistic',
  standalone: false,
  
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css'
})
export class StatisticComponent implements OnInit{
  students: Student[] = [];
  courses: Course[] = [];
  grades: Grade[] = [];
  constructor(private route: ActivatedRoute, private courseservice: CoursesService, private studentservice: StudentsService, private degreeservice: DegreesService) { }
  ngOnInit(): void {
    this.getStudents();
    this.getCourses();
    this.getGrades();
  }
 
  getStudents(): void {
    this.studentservice.getStudents().subscribe((students) => {
      this.students = students;
      console.log(students);
    });
  }

  getCourses(): void {
    this.courseservice.getCourses().subscribe((courses) => {
      this.courses = courses;
      console.log(courses);
    });
  }

  getGrades(): void {
    this.degreeservice.getGrades().subscribe((grades) => {
      this.grades = grades;
      console.log(grades);
    });
  }
}