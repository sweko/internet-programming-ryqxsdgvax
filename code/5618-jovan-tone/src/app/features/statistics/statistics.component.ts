import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.interface';
import { StudentUtilsService } from '../students/services/student-utils.service';
import { Chart } from 'chart.js/auto';

type GradeRanges = {
  'A+': number;
  'A': number;
  'A-': number;
  'B+': number;
  'B': number;
  'B-': number;
  'C+': number;
  'C': number;
  'C-': number;
  'D+': number;
  'D': number;
  'D-': number;
  'F': number;
};

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalStudents = 0;
  averageGrade = 0;
  studentsPerDegree: { [key: string]: number } = {};
  studentsPerYear: { [key: number]: number } = {};
  coursePassRates: { [key: string]: number } = {};
  loading = true;
  error = false;

  constructor(
    private apiService: ApiService,
    private studentUtils: StudentUtilsService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  private loadStatistics(): void {
    this.apiService.getStudents().subscribe({
      next: (students) => {
        this.calculateStatistics(students);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  private calculateStatistics(students: Student[]): void {
    this.totalStudents = students.length;
    
    // Calculate average grade
    let totalGrade = 0;
    let gradedStudents = 0;
    students.forEach(student => {
      const avg = this.studentUtils.calculateAverageGrade(student);
      if (avg !== null) {
        totalGrade += avg;
        gradedStudents++;
      }
    });
    this.averageGrade = gradedStudents ? Number((totalGrade / gradedStudents).toFixed(2)) : 0;

    // Calculate students per degree
    this.studentsPerDegree = students.reduce((acc, student) => {
      acc[student.degree] = (acc[student.degree] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate students per year
    this.studentsPerYear = students.reduce((acc, student) => {
      acc[student.year] = (acc[student.year] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    // Calculate course pass rates
    const courseCounts: { [key: string]: { total: number; passed: number } } = {};
    students.forEach(student => {
      student.courses.forEach(course => {
        if (!course.grade) return;
        
        if (!courseCounts[course.code]) {
          courseCounts[course.code] = { total: 0, passed: 0 };
        }
        
        courseCounts[course.code].total++;
        if (course.grade.percentage >= 60) {
          courseCounts[course.code].passed++;
        }
      });
    });

    this.coursePassRates = Object.entries(courseCounts).reduce((acc, [code, data]) => {
      acc[code] = Number(((data.passed / data.total) * 100).toFixed(2));
      return acc;
    }, {} as { [key: string]: number });

    this.createGradeDistributionChart(students);
  }

  private createGradeDistributionChart(students: Student[]): void {
    const gradeRanges: GradeRanges = {
      'A+': 0, 'A': 0, 'A-': 0,
      'B+': 0, 'B': 0, 'B-': 0,
      'C+': 0, 'C': 0, 'C-': 0,
      'D+': 0, 'D': 0, 'D-': 0,
      'F': 0
    };

    students.forEach(student => {
      student.courses.forEach(course => {
        if (course.grade) {
          gradeRanges[course.grade.letter as keyof GradeRanges]++;
        }
      });
    });

    const ctx = document.getElementById('gradeChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(gradeRanges),
        datasets: [{
          label: 'Grade Distribution',
          data: Object.values(gradeRanges),
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
} 