import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;
  apiUrl = 'https://localhost:3000/students';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.totalStudents = data.length;
        this.averageGrade = this.calculateAverageGrade(data);
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }

  calculateAverageGrade(students: any[]): number {
    const totalGrades = students.reduce((sum, student) => {
      const gradedCourses = student.courses.filter((course: any) => course.grade);
      const grades = gradedCourses.map((course: any) => course.grade.percentage);
      return sum + grades.reduce((a: number, b: number) => a + b, 0);
    }, 0);
    
    const totalCourses = students.reduce((count, student) => {
      return count + student.courses.filter((course: any) => course.grade).length;
    }, 0);

    return totalCourses > 0 ? parseFloat((totalGrades / totalCourses).toFixed(2)) : 0;
  }
}
