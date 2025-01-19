// src/app/pages/statistics/statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { DegreeService } from '../../services/degree.service';
import { CourseService } from '../../services/course.service';
import { Student } from '../../interfaces/student.interface';
import { Degree } from '../../interfaces/degree.interface';

interface DegreeStats {
  name: string;
  count: number;
}

interface YearStats {
  year: number;
  count: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Statistics</h1>

      <!-- General Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Total Students</h3>
          <p class="text-3xl font-bold">{{totalStudents}}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Average Grade</h3>
          <p class="text-3xl font-bold">{{averageGrade | number:'1.1-1'}}%</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Total Degrees</h3>
          <p class="text-3xl font-bold">{{degreeStats.length}}</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-gray-500 text-sm font-medium">Pass Rate</h3>
          <p class="text-3xl font-bold">{{passRate | number:'1.1-1'}}%</p>
        </div>
      </div>

      <!-- Students per Degree -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Students per Degree</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Degree</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Students</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (stat of degreeStats; track stat.name) {
                  <tr>
                    <td class="px-6 py-4">{{stat.name}}</td>
                    <td class="px-6 py-4">{{stat.count}}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Students per Year -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Students per Year</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Number of Students</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (stat of yearStats; track stat.year) {
                  <tr>
                    <td class="px-6 py-4">Year {{stat.year}}</td>
                    <td class="px-6 py-4">{{stat.count}}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;
  passRate: number = 0;
  degreeStats: DegreeStats[] = [];
  yearStats: YearStats[] = [];
  degreeLookup: Map<string, string> = new Map();

  constructor(
    private studentService: StudentService,
    private degreeService: DegreeService
  ) {}

  ngOnInit(): void {
    this.loadDegrees();
    this.loadStudents();
  }

  private loadDegrees(): void {
    this.degreeService.getDegrees().subscribe({
      next: (degrees) => {
        degrees.forEach(degree => {
          this.degreeLookup.set(degree.code, degree.name);
        });
      },
      error: (error) => console.error('Error loading degrees:', error)
    });
  }

  private loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.calculateStatistics(students);
      },
      error: (error) => console.error('Error loading students:', error)
    });
  }

  private calculateStatistics(students: Student[]): void {
    this.totalStudents = students.length;

    // Calculate average grade
    const grades = students
      .map(student => this.studentService.calculateAverageGrade(student))
      .filter(grade => grade !== null) as number[];
    this.averageGrade = grades.length > 0 
      ? grades.reduce((sum, grade) => sum + grade, 0) / grades.length 
      : 0;

    // Calculate pass rate
    const passedGrades = grades.filter(grade => grade >= 50);
    this.passRate = grades.length > 0 
      ? (passedGrades.length / grades.length) * 100 
      : 0;

    // Calculate students per degree
    const degreeCount = new Map<string, number>();
    students.forEach(student => {
      const degreeName = this.degreeLookup.get(student.degree) || student.degree;
      degreeCount.set(degreeName, (degreeCount.get(degreeName) || 0) + 1);
    });
    this.degreeStats = Array.from(degreeCount.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    
    const yearCount = new Map<number, number>();
    students.forEach(student => {
      yearCount.set(student.year, (yearCount.get(student.year) || 0) + 1);
    });
    this.yearStats = Array.from(yearCount.entries())
      .map(([year, count]) => ({ year, count }))
      .sort((a, b) => a.year - b.year);
  }
}
