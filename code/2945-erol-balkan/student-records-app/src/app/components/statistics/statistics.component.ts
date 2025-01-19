import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  totalStudents: number = 0;
  averageGrade: number = 0;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics(): void {
    this.studentService.getStudents().subscribe(
      (students: Student[]) => {
        this.totalStudents = students.length;
        this.averageGrade = this.calculateAverageGrade(students);
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  calculateAverageGrade(students: Student[]): number {
    const totalGrades = students.reduce((sum, student) => {
      const gradedCourses = student.courses.filter(course => course.grade);
      const grades = gradedCourses.map(course => course.grade!.percentage);
      return sum + grades.reduce((a, b) => a + b, 0);
    }, 0);
    
    const totalCourses = students.reduce((count, student) => {
      return count + student.courses.filter(course => course.grade).length;
    }, 0);

    return totalCourses > 0 ? totalGrades / totalCourses : 0;
  }
}
