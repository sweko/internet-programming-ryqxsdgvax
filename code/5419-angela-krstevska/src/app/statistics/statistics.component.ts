import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { DecimalPipe, KeyValuePipe, NgForOf, NgIf } from '@angular/common';
import { Degree, Student } from '../../models/student';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-statistics',
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    DecimalPipe,
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  students: Student[] = [];
  degrees: Degree[] = [];
  totalStudents = 0;
  totalStudentsByYear = new Map<number, number>();
  totalStudentsByDegree = new Map<string, number>();

  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.updateStatistics();
    });
    this.studentService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
      this.updateStatistics();
    });
  }

  updateStatistics() {
    this.calculateTotalStudents();
    this.calculateStudentsByYear();
    this.calculateStudentsByDegree();
  }

  calculateTotalStudents() {
    this.totalStudents = this.students.length;
  }

  calculateStudentsByYear() {
    this.totalStudentsByYear.clear();
    this.students.forEach(student => {
      const year = student.year;
      if (this.totalStudentsByYear.has(year)) {
        this.totalStudentsByYear.set(year, this.totalStudentsByYear.get(year)! + 1);
      } else {
        this.totalStudentsByYear.set(year, 1);
      }
    });
  }

  calculateStudentsByDegree() {
    this.totalStudentsByDegree.clear();
    this.students.forEach(student => {
      const degree = student.degree;
      if (this.totalStudentsByDegree.has(degree)) {
        this.totalStudentsByDegree.set(degree, this.totalStudentsByDegree.get(degree)! + 1);
      } else {
        this.totalStudentsByDegree.set(degree, 1);
      }
    });
  }
}
