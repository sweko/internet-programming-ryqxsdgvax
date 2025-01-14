import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.model';

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
objectKeys(arg0: { [degree: string]: number; }): any {
throw new Error('Method not implemented.');
}
    totalStudents: number = 0;
    averageGrade: number | null = null;
    studentsPerDegree: { [degree: string]: number } = {};
    studentsPerYear: { [year: number]: number } = {};

    constructor(private studentService: StudentService) {}

    ngOnInit(): void {
        this.fetchStatistics();
    }

    fetchStatistics(): void {
        this.studentService.getStudents().subscribe(
            (students) => {
                this.totalStudents = students.length;
                this.calculateAverageGrade(students);
                this.calculateStudentsPerDegree(students);
                this.calculateStudentsPerYear(students);
            },
            (error) => {
                console.error('Error fetching students:', error);
            }
        );
    }

    calculateAverageGrade(students: Student[]): void {
        let totalGrades = 0;
        let gradedCourses = 0;

        students.forEach((student) => {
            student.courses.forEach((course) => {
                if (course.grade) {
                    totalGrades += course.grade.percentage;
                    gradedCourses++;
                }
            });
        });

        this.averageGrade = gradedCourses > 0 ? parseFloat((totalGrades / gradedCourses).toFixed(2)) : null;
    }

    calculateStudentsPerDegree(students: Student[]): void {
        this.studentsPerDegree = {};
        students.forEach((student) => {
            this.studentsPerDegree[student.degree] = (this.studentsPerDegree[student.degree] || 0) + 1;
        });
    }

    calculateStudentsPerYear(students: Student[]): void {
        this.studentsPerYear = {};
        students.forEach((student) => {
            this.studentsPerYear[student.year] = (this.studentsPerYear[student.year] || 0) + 1;
        });
    }
}