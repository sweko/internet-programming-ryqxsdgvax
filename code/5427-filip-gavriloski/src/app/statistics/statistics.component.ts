import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Import ApiService
import { forkJoin } from 'rxjs'; // Import forkJoin for parallel requests
import { Chart } from 'chart.js'; // Import Chart.js
import { BaseChartDirective } from 'ng2-charts'; // Import ng2-charts

interface Student {
  grade: number;
  year: number;
  degreeId: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html', // Ensure this path is correct
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrades: number = 0;
  studentsByYear: { [key: number]: number } = {};
  studentsByDegree: { [key: string]: number } = {};

  // Chart data properties
  pieChartData: number[] = [];
  pieChartLabels: string[] = [];
  barChartData: number[] = [];
  barChartLabels: string[] = [];

  // Chart options
  pieChartOptions = {
    responsive: true,
  };

  barChartOptions = {
    responsive: true,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Fetch data from API endpoints
    forkJoin({
      students: this.apiService.getStudents(),
      degrees: this.apiService.getDegrees(),
      courses: this.apiService.getCourses()
    }).subscribe(({ students, degrees, courses }) => {
      this.totalStudents = students.length;

      // Calculate average grades
      const totalGrades = students.reduce((sum: number, student: Student) => sum + (student.grade || 0), 0);
      this.averageGrades = totalGrades / this.totalStudents;

      // Calculate distribution of students by year
      this.studentsByYear = students.reduce((acc: { [key: number]: number }, student: Student) => {
        acc[student.year] = (acc[student.year] || 0) + 1;
        return acc;
      }, {});

      // Calculate distribution of students by degree
      this.studentsByDegree = students.reduce((acc: { [key: string]: number }, student: Student) => {
        const degree = degrees.find(deg => deg.id === student.degreeId)?.name || 'Unknown';
        acc[degree] = (acc[degree] || 0) + 1;
        return acc;
      }, {});

      // Populate chart data
      this.pieChartData = Object.values(this.studentsByDegree);
      this.pieChartLabels = Object.keys(this.studentsByDegree);
      this.barChartData = Object.values(this.studentsByYear);
      this.barChartLabels = Object.keys(this.studentsByYear);
    });
  }
}
