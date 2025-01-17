import { Component } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  totalStudents: number = 0;
  averageGrade: number = 0;
  studentsPerDegree: { [key: string]: number } = {};
  studentsPerYear: { [key: number]: number } = {};
  passRatePerCourse: { [key: string]: number } = {};

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.studentService.getStudents().subscribe(
      (students: Student[]) => {
        this.totalStudents = students.length;
        this.calculateAverageGrade(students);
        this.calculateStudentsPerDegree(students);
        this.calculateStudentsPerYear(students);
        this.calculatePassRatePerCourse(students);
      },
      error => console.error('Error fetching students:', error)
    );
  }

  calculateAverageGrade(students: Student[]): void {
    let totalGrade = 0;
    let gradeCount = 0;
    students.forEach(student => {
      student.courses?.forEach(course => {
        if (course.grade) {
          totalGrade += this.letterToNumber(course.grade.letter);
          gradeCount++;
        }
      });
    });
    this.averageGrade = gradeCount > 0 ? totalGrade / gradeCount : 0;
  }

  calculateStudentsPerDegree(students: Student[]): void {
    students.forEach(student => {
      this.studentsPerDegree[student.degree] = (this.studentsPerDegree[student.degree] || 0) + 1;
    });
  }

  calculateStudentsPerYear(students: Student[]): void {
    students.forEach(student => {
      this.studentsPerYear[student.year] = (this.studentsPerYear[student.year] || 0) + 1;
    });
  }

  calculatePassRatePerCourse(students: Student[]): void {
    const courseStats = students.reduce((stats, student) => {
      student.courses?.forEach(course => {
        if (course.grade) {
          if (!stats[course.code]) {
            stats[course.code] = { total: 0, passes: 0 };
          }
          stats[course.code].total++;
          if (this.isPassing(course.grade.letter)) {
            stats[course.code].passes++;
          }
        }
      });
      return stats;
    }, {} as { [key: string]: { total: number, passes: number } });
  
    this.passRatePerCourse = Object.entries(courseStats).reduce((rates, [courseName, stats]) => {
      rates[courseName] = (stats.passes / stats.total) * 100;
      return rates;
    }, {} as { [key: string]: number });
  }

  letterToNumber(grade: string): number {
    const gradeMap: { [key: string]: number } = { 'A': 4, 'B': 3, 'C': 2, 'D': 1, 'F': 0 };
    return gradeMap[grade.toUpperCase()] || 0;
  }

  isPassing(grade: string): boolean {
    return ['A', 'B', 'C', 'D'].includes(grade.toUpperCase());
  }
}
