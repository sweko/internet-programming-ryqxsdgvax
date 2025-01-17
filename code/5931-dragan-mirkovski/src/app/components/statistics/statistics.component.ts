import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/student.service';
import { Student } from '../../models/student';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  studentsPerDegree: { [degree: string]: number } = {};

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe((students) => {
      this.totalStudents = students.length;
      this.calculateStudentsPerDegree(students);
    });
  }

  calculateStudentsPerDegree(students: Student[]): void {
    this.studentsPerDegree = students.reduce((acc, student) => {
      acc[student.degree] = (acc[student.degree] || 0) + 1;
      return acc;
    }, {} as { [degree: string]: number });
  }
  getKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
}
