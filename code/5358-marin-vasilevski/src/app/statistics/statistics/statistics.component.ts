import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  totalCourses: number = 0;
  totalDegrees: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.apiService.getStudents().subscribe(
      (students) => (this.totalStudents = students.length),
      (error) => console.error('Error fetching students:', error)
    );

    this.apiService.getCourses().subscribe(
      (courses) => (this.totalCourses = courses.length),
      (error) => console.error('Error fetching courses:', error)
    );

    this.apiService.getDegrees().subscribe(
      (degrees) => (this.totalDegrees = degrees.length),
      (error) => console.error('Error fetching degrees:', error)
    );
  }
}
