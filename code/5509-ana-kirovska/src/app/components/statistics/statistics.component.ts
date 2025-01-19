import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { NgFor } from '@angular/common'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [MatCardModule,RouterModule,NgFor,CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  students:Student[]=[];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentService.fetchStudents().subscribe((data)=>{
      this.students=data;
    });
  }

  get totalStudents():number{
    return this.students.length;
  }

  get averageGrade(): number {
    const totalGrades = this.students.flatMap(student =>
      student.courses.filter(course => course.grade)
        .map(course => course.grade!.percentage)
    );
    const total = totalGrades.reduce((acc, grade) => acc + grade, 0);
    return totalGrades.length > 0 ? total / totalGrades.length : 0;
  }

  get studentsPerDegree(): Record<string, number> {
    return this.students.reduce((acc, student) => {
      acc[student.degree] = (acc[student.degree] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  get studentsPerYear(): Record<number, number> {
    return this.students.reduce((acc, student) => {
      acc[student.year] = (acc[student.year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }

  get passRatePerCourse(): Record<string, number> {
    const coursePassRates: Record<string, number[]> = {};

    this.students.forEach(student => {
      student.courses.forEach(course => {
        if (course.grade) {
          if (!coursePassRates[course.code]) {
            coursePassRates[course.code] = [];
          }
          coursePassRates[course.code].push(course.grade!.percentage);
        }
      });
    });

    const passRate: Record<string, number> = {};
    for (const [courseCode, grades] of Object.entries(coursePassRates)) {
      const passingCount = grades.filter(grade => grade >= 50).length;
      passRate[courseCode] = (passingCount / grades.length) * 100;
    }

    return passRate;
  }

  // For the bonus: Grade distribution chart
  // get gradeDistribution(): Record<string, number> {
  //   const distribution: Record<string, number> = { A: 0, 'A-': 0, B+: 0, B: 0, 'B-': 0, C: 0, D: 0, F: 0 };

  //   this.students.forEach(student => {
  //     student.courses.forEach(course => {
  //       if (course.grade) {
  //         distribution[course.grade.letter] = (distribution[course.grade.letter] || 0) + 1;
  //       }
  //     });
  //   });

  //   return distribution;
  // }
}
