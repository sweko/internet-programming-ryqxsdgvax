import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, map, shareReplay } from 'rxjs';
import { Student } from '../../models/student.interface';
import { ApiService } from '../../services/api.service';
import { StateService } from '../../services/state.service';
import { GradeService } from '../../services/grade.service';
import { NavigationService } from '../../services/navigation.service';

interface DegreeStats {
  code: string;
  studentCount: number;
  averageGrade: number;
  passRate: number;
}

interface YearStats {
  year: number;
  studentCount: number;
  averageGrade: number;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  loading = true;
  error = '';
  students: Student[] = [];
  totalStudents = 0;
  overallAverageGrade = 0;
  degreeStats: DegreeStats[] = [];
  yearStats: YearStats[] = [];
  private destroy$ = new Subject<void>();

  statistics$ = this.api.getStudents().pipe(
    map(students => ({
      totalStudents: students.length,
      averageGrade: this.calculateOverallAverage(students),
      studentsPerDegree: this.calculateStudentsPerDegree(students),
      studentsPerYear: this.calculateStudentsPerYear(students),
      passRates: this.calculatePassRates(students)
    })),
    shareReplay(1)
  );

  constructor(
    private api: ApiService,
    private state: StateService,
    private gradeService: GradeService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.navigationService.setTitle('Statistics');
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.state.setLoading(true);
    this.api.getStudents().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (students) => {
        this.students = students;
        this.calculateStatistics();
        this.loading = false;
        this.state.setLoading(false);
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.error = 'Failed to load statistics';
        this.loading = false;
        this.state.setLoading(false);
      }
    });
  }

  private calculateStatistics(): void {
    // Total students
    this.totalStudents = this.students.length;

    // Overall average grade
    const allGrades = this.students.flatMap(student => 
      student.courses
        .filter(course => course.grade)
        .map(course => course.grade!.percentage)
    );
    this.overallAverageGrade = this.gradeService.calculateAverageGrade(allGrades);

    // Stats by degree
    const degreeGroups = this.groupBy(this.students, 'degree');
    this.degreeStats = Object.entries(degreeGroups).map(([code, students]) => {
      const grades = students.flatMap(s => 
        s.courses
          .filter(c => c.grade)
          .map(c => c.grade!.percentage)
      );
      const passedCourses = students.flatMap(s => 
        s.courses.filter(c => c.grade && this.gradeService.isPassingGrade(c.grade.percentage))
      );
      const totalGradedCourses = students.flatMap(s => 
        s.courses.filter(c => c.grade)
      );

      return {
        code,
        studentCount: students.length,
        averageGrade: this.gradeService.calculateAverageGrade(grades),
        passRate: totalGradedCourses.length 
          ? (passedCourses.length / totalGradedCourses.length) * 100 
          : 0
      };
    });

    // Stats by year
    const yearGroups = this.groupBy(this.students, 'year');
    this.yearStats = Object.entries(yearGroups).map(([year, students]) => {
      const grades = students.flatMap(s => 
        s.courses
          .filter(c => c.grade)
          .map(c => c.grade!.percentage)
      );

      return {
        year: Number(year),
        studentCount: students.length,
        averageGrade: this.gradeService.calculateAverageGrade(grades)
      };
    }).sort((a, b) => a.year - b.year);
  }

  private groupBy<T>(array: T[], key: keyof T): { [key: string]: T[] } {
    return array.reduce((groups, item) => {
      const groupKey = String(item[key]);
      groups[groupKey] = groups[groupKey] || [];
      groups[groupKey].push(item);
      return groups;
    }, {} as { [key: string]: T[] });
  }

  getLetterGrade(percentage: number): string {
    return this.gradeService.calculateLetterGrade(percentage);
  }

  private calculateOverallAverage(students: Student[]): number {
    const allGrades = students.flatMap(s => 
      s.courses.filter(c => c.grade).map(c => c.grade!.percentage)
    );
    return allGrades.length ? allGrades.reduce((a, b) => a + b, 0) / allGrades.length : 0;
  }

  private calculateStudentsPerDegree(students: Student[]): Record<string, number> {
    return students.reduce((acc, student) => ({
      ...acc,
      [student.degree]: (acc[student.degree] || 0) + 1
    }), {} as Record<string, number>);
  }

  private calculateStudentsPerYear(students: Student[]): Record<number, number> {
    return students.reduce((acc, student) => ({
      ...acc,
      [student.year]: (acc[student.year] || 0) + 1
    }), {} as Record<number, number>);
  }

  private calculatePassRates(students: Student[]): Record<string, number> {
    const courseStats = students.flatMap(s => s.courses)
      .reduce((acc, course) => {
        if (!acc[course.code]) {
          acc[course.code] = { total: 0, passed: 0 };
        }
        if (course.grade) {
          acc[course.code].total++;
          if (course.grade.percentage >= 60) {
            acc[course.code].passed++;
          }
        }
        return acc;
      }, {} as Record<string, { total: number; passed: number }>);

    return Object.entries(courseStats).reduce((acc, [code, stats]) => ({
      ...acc,
      [code]: stats.total ? (stats.passed / stats.total) * 100 : 0
    }), {} as Record<string, number>);
  }
} 