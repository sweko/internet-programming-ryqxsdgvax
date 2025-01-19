import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number | string = 'N/A';
  studentsPerDegree: { [degree: string]: number } = {};
  studentsPerYear: { [year: number]: number } = {};
  passRatePerCourse: { [courseCode: string]: string } = {};
  gradeDistribution: { [grade: string]: number } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe(
      (students: Student[]) => {
        this.calculateStatistics(students);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  private calculateStatistics(students: Student[]): void {
    this.totalStudents = students.length;

    // Average Grade
    const grades = students.flatMap((student) =>
      student.courses
        .filter((course) => course.grade)
        .map((course) => course.grade!.percentage)
    );
    const totalGrades = grades.reduce((sum, grade) => sum + grade, 0);
    this.averageGrade = grades.length > 0 ? (totalGrades / grades.length).toFixed(2) : 'N/A';

    // Students per Degree
    students.forEach((student) => {
      this.studentsPerDegree[student.degree] = (this.studentsPerDegree[student.degree] || 0) + 1;
    });

    // Students per Year
    students.forEach((student) => {
      this.studentsPerYear[student.year] = (this.studentsPerYear[student.year] || 0) + 1;
    });

    // Pass Rate per Course
    const coursePassRates: { [courseCode: string]: { total: number; passed: number } } = {};
    students.forEach((student) => {
      student.courses.forEach((course) => {
        if (!coursePassRates[course.code]) {
          coursePassRates[course.code] = { total: 0, passed: 0 };
        }
        coursePassRates[course.code].total += 1;
        if (course.grade && course.grade.percentage >= 60) {
          coursePassRates[course.code].passed += 1;
        }
      });
    });
    Object.keys(coursePassRates).forEach((code) => {
      const { total, passed } = coursePassRates[code];
      this.passRatePerCourse[code] = ((passed / total) * 100).toFixed(2) + '%';
    });

    // Grade Distribution
    students.forEach((student) => {
      student.courses.forEach((course) => {
        if (course.grade) {
          const letter = course.grade.letter;
          this.gradeDistribution[letter] = (this.gradeDistribution[letter] || 0) + 1;
        }
      });
    });
  }

  getKeys(obj: { [key: string]: any }): string[] {
    return Object.keys(obj);
  }
}
