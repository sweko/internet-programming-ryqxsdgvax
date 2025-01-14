import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Import ApiService
import { forkJoin } from 'rxjs'; // Import forkJoin for parallel requests

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrades: number = 0;
  studentsByYear: { [key: number]: number } = {};
  studentsByDegree: { [key: string]: number } = {};

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
      const totalGrades = students.reduce((sum, student) => sum + (student.grade || 0), 0);
      this.averageGrades = totalGrades / this.totalStudents;

      // Calculate distribution of students by year
      this.studentsByYear = students.reduce((acc, student) => {
        acc[student.year] = (acc[student.year] || 0) + 1;
        return acc;
      }, {});

      // Calculate distribution of students by degree
      this.studentsByDegree = students.reduce((acc, student) => {
        const degree = degrees.find(deg => deg.id === student.degreeId)?.name || 'Unknown';
        acc[degree] = (acc[degree] || 0) + 1;
        return acc;
      }, {});
    });
  }
}