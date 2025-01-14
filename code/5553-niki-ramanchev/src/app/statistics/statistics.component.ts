import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [CommonModule], 
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;
  studentsPerDegree: { [degree: string]: number } = {};
  studentsPerYear: { [year: number]: number } = {};
  passRatePerCourse: { [course: string]: number } = {};
  gradeDistribution: { [grade: string]: number } = {};

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.calculateStatistics(students);
      },
      error: (err) => {
        console.error('Failed to fetch students for statistics:', err);
      },
    });
  }

  calculateStatistics(students: any[]): void {
    this.totalStudents = students.length;

    let totalGradeSum = 0;
    let totalGradedCourses = 0;

    const coursePassCounts: { [courseCode: string]: { passed: number; total: number } } = {};

    students.forEach((student) => {
      student.courses.forEach((course: any) => {
        if (course.grade) {
          totalGradeSum += course.grade.percentage;
          totalGradedCourses += 1;

          if (!coursePassCounts[course.code]) {
            coursePassCounts[course.code] = { passed: 0, total: 0 };
          }

          coursePassCounts[course.code].total += 1;
          if (course.grade.percentage >= 60) {
            coursePassCounts[course.code].passed += 1;
          }

          const gradeLetter = course.grade.letter;
          this.gradeDistribution[gradeLetter] = (this.gradeDistribution[gradeLetter] || 0) + 1;
        }
      });

      const degree = student.degree;
      this.studentsPerDegree[degree] = (this.studentsPerDegree[degree] || 0) + 1;

      const year = student.year;
      this.studentsPerYear[year] = (this.studentsPerYear[year] || 0) + 1;
    });

    this.averageGrade = totalGradedCourses > 0 ? +(totalGradeSum / totalGradedCourses).toFixed(2) : 0;

    Object.keys(coursePassCounts).forEach((courseCode) => {
      const { passed, total } = coursePassCounts[courseCode];
      this.passRatePerCourse[courseCode] = +(passed / total * 100).toFixed(2);
    });
  }

  getKeys(obj: object): string[] {
    return Object.keys(obj);
  }
}
