import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;
  studentsPerDegree: { [key: string]: number } = {};
  studentsPerYear: { [key: number]: number } = {};

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.totalStudents = students.length;
        this.calculateAverageGrade(students);
        this.calculateStudentsPerDegree(students);
        this.calculateStudentsPerYear(students);
      },
      (error) => {
        console.error('Error fetching students for statistics:', error);
      }
    );
  }

  calculateAverageGrade(students: any[]): void {
    const totalGrades = students.reduce((sum, student) => {
      const gradedCourses = student.courses.filter((course: any) => course.grade);
      const average = gradedCourses.reduce((avg: number, course: any) => avg + course.grade.percentage, 0) / gradedCourses.length;
      return sum + (isNaN(average) ? 0 : average);
    }, 0);
    this.averageGrade = totalGrades / students.length;
  }

  calculateStudentsPerDegree(students: any[]): void {
    students.forEach(student => {
      this.studentsPerDegree[student.degree] = (this.studentsPerDegree[student.degree] || 0) + 1;
    });
  }

  calculateStudentsPerYear(students: any[]): void {
    students.forEach(student => {
      this.studentsPerYear[student.year] = (this.studentsPerYear[student.year] || 0) + 1;
    });
  }
}
