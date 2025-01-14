import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { CommonModule } from '@angular/common';
import { Student } from '../model/model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;
  studentsPerDegree: { [degree: string]: number } = {};
  studentsPerYear: { [year: string]: number } = {};
  passRatePerCourse: { [courseName: string]: { passCount: number, totalCount: number, passRate: number } } = {};
  gradeDistribution: { [grade: string]: number } = {};

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.appService.getStudents().subscribe(students => {
      this.totalStudents = students.length;

      // Calculate average grade
      let totalGrades = 0;
      let totalGradedCourses = 0;
      
      students.forEach(student => {
        student.courses.forEach(course => {
          if (course.grade) {
            totalGrades += course.grade.percentage;
            totalGradedCourses++;
          }
        });
      });
      
      this.averageGrade = totalGradedCourses > 0 ? totalGrades / totalGradedCourses : 0;

      // Students per degree
      this.studentsPerDegree = this.getStudentsPerDegree(students);

      // Students per year
      this.studentsPerYear = this.getStudentsPerYear(students);

      // Pass rate per course
      this.passRatePerCourse = this.getPassRatePerCourse(students);

      // Grade distribution
      this.gradeDistribution = this.getGradeDistribution(students);
    });
  }

  getStudentsPerDegree(students: Student[]): { [degree: string]: number } {
    const result: { [degree: string]: number } = {};
    students.forEach(student => {
      if (result[student.degree]) {
        result[student.degree]++;
      } else {
        result[student.degree] = 1;
      }
    });
    return result;
  }

  getStudentsPerYear(students: Student[]): { [year: string]: number } {
    const result: { [year: string]: number } = {};
    students.forEach(student => {
      const yearKey = `Year ${student.year}`;
      if (result[yearKey]) {
        result[yearKey]++;
      } else {
        result[yearKey] = 1;
      }
    });
    return result;
  }

  getPassRatePerCourse(students: Student[]): { [courseName: string]: { passCount: number, totalCount: number, passRate: number } } {
    const result: { [courseName: string]: { passCount: number, totalCount: number, passRate: number } } = {};

    students.forEach(student => {
      student.courses.forEach(course => {
        if (!result[course.name]) {
          result[course.name] = { passCount: 0, totalCount: 0, passRate: 0 };
        }

        if (course.grade) {
          result[course.name].totalCount++;
          if (course.grade.percentage >= 50) {
            result[course.name].passCount++;
          }
        }
      });
    });

    // Calculate pass rate for each course
    Object.keys(result).forEach(courseName => {
      const course = result[courseName];
      course.passRate = course.totalCount > 0 ? (course.passCount / course.totalCount) * 100 : 0;
    });

    return result;
  }

  getGradeDistribution(students: Student[]): { [grade: string]: number } {
    const result: { [grade: string]: number } = { A: 0, B: 0, C: 0, D: 0, F: 0 };

    students.forEach(student => {
      student.courses.forEach(course => {
        if (course.grade?.letter) {
          result[course.grade.letter]++;
        }
      });
    });
    return result;
  }
}