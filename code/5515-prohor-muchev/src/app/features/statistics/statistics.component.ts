import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Student } from '../../shared/interfaces';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="statistics-container">
      <h2>Statistics</h2>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Students</h3>
          <p class="stat-value">{{ totalStudents }}</p>
        </div>
        
        <div class="stat-card">
          <h3>Average Grade</h3>
          <p class="stat-value">{{ averageGrade }}%</p>
        </div>
      </div>

      <div class="section">
        <h3>Students per Degree</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Degree</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            @for (item of studentsPerDegree | keyvalue; track item.key) {
              <tr>
                <td>{{ item.key }}</td>
                <td>{{ item.value }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="section">
        <h3>Students per Year</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            @for (item of studentsPerYear | keyvalue; track item.key) {
              <tr>
                <td>Year {{ item.key }}</td>
                <td>{{ item.value }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .statistics-container {
      padding: var(--spacing-md);
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-md);
      margin-bottom: var(--spacing-xl);
    }
    .stat-card {
      padding: var(--spacing-md);
      background: var(--bg-secondary);
      border-radius: var(--border-radius-md);
      text-align: center;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      margin: 0;
    }
    .section {
      margin-bottom: var(--spacing-xl);
    }
    .table {
      width: 100%;
      border-collapse: collapse;
    }
    .table th, .table td {
      padding: var(--spacing-sm);
      border: 1px solid lightgray;
    }
  `]
})
export class StatisticsComponent implements OnInit {
  totalStudents = 0;
  averageGrade = 0;
  studentsPerDegree: Record<string, number> = {};
  studentsPerYear: Record<number, number> = {};

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.dataService.getStudents().subscribe({
      next: (students) => {
        this.calculateStatistics(students);
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
      }
    });
  }

  calculateStatistics(students: Student[]) {
    this.totalStudents = students.length;
    
    let totalGrade = 0;
    let gradedStudents = 0;
    
    students.forEach(student => {
      const gradedCourses = student.courses.filter(c => c.grade);
      if (gradedCourses.length > 0) {
        const studentAvg = gradedCourses.reduce((acc, c) => 
          acc + (c.grade?.percentage || 0), 0) / gradedCourses.length;
        totalGrade += studentAvg;
        gradedStudents++;
      }
    });
    
    this.averageGrade = gradedStudents > 0 
      ? Number((totalGrade / gradedStudents).toFixed(2))
      : 0;

    this.studentsPerDegree = students.reduce((acc, student) => {
      acc[student.degree] = (acc[student.degree] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    this.studentsPerYear = students.reduce((acc, student) => {
      acc[student.year] = (acc[student.year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }
}

export default StatisticsComponent; 