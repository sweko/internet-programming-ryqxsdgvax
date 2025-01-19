import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: string = 'N/A';
  studentsPerDegree: { [key: string]: number } = {};
  studentsPerYear: { [key: number]: number } = {};

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentsService.getStudents().subscribe((students) => {
      this.totalStudents = students.length;
      this.calculateAverageGrade(students);
      this.calculateStudentsPerDegree(students);
      this.calculateStudentsPerYear(students);
    });
  }

  calculateAverageGrade(students: Student[]): void {
    const gradedCourses = students.flatMap(student => student.courses.filter(course => course.grade));
    if (gradedCourses.length === 0) {
      this.averageGrade = 'N/A';
      return;
    }
    const totalPercentage = gradedCourses.reduce((sum, course) => sum + (course.grade?.percentage || 0), 0);
    const average = totalPercentage / gradedCourses.length;
    this.averageGrade = average.toFixed(2);
  }

  calculateStudentsPerDegree(students: Student[]): void {
    this.studentsPerDegree = students.reduce((acc, student) => {
      acc[student.degree] = (acc[student.degree] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }

  calculateStudentsPerYear(students: Student[]): void {
    this.studentsPerYear = students.reduce((acc, student) => {
      acc[student.year] = (acc[student.year] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });
  }
}