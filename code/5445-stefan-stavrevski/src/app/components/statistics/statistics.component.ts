import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class StatisticsComponent implements OnInit {
  totalStudents = 0;
  averageGrade = 'N/A';
  studentsPerDegree: Record<string, number> = {};
  studentsPerYear: Record<number, number> = {};
  gradeDistribution: Record<string, number> = {};
  passRatePerCourse: Record<string, number> = {};

  objectKeys = Object.keys;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.apiService.getStudents().subscribe((students) => {
      this.totalStudents = students.length;
      this.calculateAverageGrade(students);
      this.calculateStudentsPerDegree(students);
      this.calculateStudentsPerYear(students);
      this.calculateGradeDistribution(students);
      this.calculatePassRatePerCourse(students);
    });
  }

  calculateAverageGrade(students: any[]) {
    const grades = students.flatMap((student) =>
      student.courses
        .filter((course: any) => course.grade)
        .map((course: any) => course.grade.percentage)
    );

    if (grades.length > 0) {
      const total = grades.reduce((sum, grade) => sum + grade, 0);
      this.averageGrade = (total / grades.length).toFixed(2);
    }
  }

  calculateStudentsPerDegree(students: any[]) {
    students.forEach((student) => {
      this.studentsPerDegree[student.degree] =
        (this.studentsPerDegree[student.degree] || 0) + 1;
    });
  }

  calculateStudentsPerYear(students: any[]) {
    students.forEach((student) => {
      this.studentsPerYear[student.year] =
        (this.studentsPerYear[student.year] || 0) + 1;
    });
  }

  calculateGradeDistribution(students: any[]) {
    const gradeScale = ['A', 'B', 'C', 'D', 'F'];

    students
      .flatMap((student) =>
        student.courses.filter((course: any) => course.grade)
      )
      .forEach((course: any) => {
        const letter = course.grade.letter;
        if (gradeScale.includes(letter)) {
          this.gradeDistribution[letter] =
            (this.gradeDistribution[letter] || 0) + 1;
        }
      });
  }

  calculatePassRatePerCourse(students: any[]) {
    const passRate: Record<string, { total: number; passed: number }> = {};

    students.forEach((student) =>
      student.courses.forEach((course: any) => {
        if (!passRate[course.code]) {
          passRate[course.code] = { total: 0, passed: 0 };
        }
        passRate[course.code].total++;
        if (course.grade?.percentage >= 60) {
          passRate[course.code].passed++;
        }
      })
    );

    for (const code in passRate) {
      const { total, passed } = passRate[code];
      this.passRatePerCourse[code] = parseFloat(
        ((passed / total) * 100).toFixed(2)
      );
    }
  }
}
