import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;
  studentsPerDegree: { [degree: string]: number } = {};
  studentsPerYear: { [year: number]: number } = {};

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.studentService.getStudents().subscribe(students => {
      this.totalStudents = students.length;
      
      let totalGrades = 0;
      let gradedCoursesCount = 0;
      this.studentsPerDegree = {};
      this.studentsPerYear = {};

      students.forEach(student => {
        const studentGrades = student.courses.filter(course => course.grade);
        studentGrades.forEach(course => {
          totalGrades += course.grade?.percentage || 0;
          gradedCoursesCount++;
        });

        if (this.studentsPerDegree[student.degree]) {
          this.studentsPerDegree[student.degree]++;
        } else {
          this.studentsPerDegree[student.degree] = 1;
        }

        if (this.studentsPerYear[student.year]) {
          this.studentsPerYear[student.year]++;
        } else {
          this.studentsPerYear[student.year] = 1;
        }
      });

      this.averageGrade = gradedCoursesCount > 0 ? totalGrades / gradedCoursesCount : 0;
    });
  }
}
