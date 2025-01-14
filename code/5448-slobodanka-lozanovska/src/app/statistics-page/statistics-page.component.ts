import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student'; 
import { StudentService } from '../student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics-page',
  imports: [CommonModule],
  templateUrl: './statistics-page.component.html',
  styleUrl: './statistics-page.component.css'
})
export class StudentsStatisticsComponent implements OnInit {

  totalStudents: number = 0;
  averageGrade: number = 0;
  studentsPerDegree: Map<string, number> = new Map();
  studentsPerYear: Map<number, number> = new Map();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics() {
    this.studentService.getStudents().subscribe(students => {
      this.calculateStatistics(students);
    });
  }

  private calculateStatistics(students: Student[]) {
    this.totalStudents = students.length;
    
    const totalGrade = students.reduce((sum, student) => sum + student.averageGrade, 0);
    this.averageGrade = this.totalStudents > 0 ? totalGrade / this.totalStudents : 0;

    const degreeCounts = new Map<string, number>();
    const yearCounts = new Map<number, number>();

    students.forEach(student => {
      const degree = student.degree;
      const year = student.year;

      degreeCounts.set(degree, (degreeCounts.get(degree) || 0) + 1);
      yearCounts.set(year, (yearCounts.get(year) || 0) + 1);
    });

    this.studentsPerDegree = degreeCounts;
    this.studentsPerYear = yearCounts;
  }
}
