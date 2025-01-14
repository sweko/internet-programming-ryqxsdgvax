import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil, combineLatest, map, shareReplay } from 'rxjs';
import { Course } from '../../../models/course.interface';
import { Student } from '../../../models/student.interface';
import { ApiService } from '../../../services/api.service';
import { GradeService } from '../../../services/grade.service';

interface CourseWithStats extends Course {
  studentCount: number;
  passRate: number;
  averageGrade: number;
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="course-list-container">
      <h1>Courses</h1>

      @if (loading) {
        <div class="loading">Loading...</div>
      } @else if (error) {
        <div class="error">{{ error }}</div>
      } @else {
        <table class="course-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Credits</th>
              <th>Students</th>
              <th>Pass Rate</th>
              <th>Average Grade</th>
            </tr>
          </thead>
          <tbody>
            @for (course of courses$ | async; track course.code) {
              <tr>
                <td>{{ course.code }}</td>
                <td>{{ course.name }}</td>
                <td>{{ course.credits }}</td>
                <td>{{ course.studentCount }}</td>
                <td>{{ course.passRate.toFixed(1) }}%</td>
                <td>
                  @if (course.averageGrade) {
                    {{ course.averageGrade.toFixed(1) }}%
                    ({{ gradeService.calculateLetterGrade(course.averageGrade) }})
                  } @else {
                    N/A
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
    </div>
  `,
  styles: [`
    .course-list-container {
      padding: var(--spacing-lg);
    }

    .course-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: var(--spacing-lg);
    }

    .course-table th,
    .course-table td {
      padding: var(--spacing-sm);
      text-align: left;
      border-bottom: 1px solid var(--primary-light);
    }

    .course-table th {
      background-color: var(--primary);
      color: var(--white);
    }

    .loading {
      text-align: center;
      padding: var(--spacing-xl);
      color: var(--text-secondary);
    }

    .error {
      color: #f44336;
      text-align: center;
      padding: var(--spacing-xl);
    }
  `]
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses$ = combineLatest([
    this.api.getCourses(),
    this.api.getStudents()
  ]).pipe(
    map(([courses, students]) => this.calculateCourseStatistics(courses, students)),
    shareReplay(1)
  );
  
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private api: ApiService,
    public gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.courses$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => this.loading = false,
      error: (err) => {
        console.error('Error loading courses:', err);
        this.error = 'Failed to load courses';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private calculateCourseStatistics(courses: Course[], students: Student[]): CourseWithStats[] {
    return courses.map(course => {
      const studentsInCourse = students.filter(student => 
        student.courses.some((c: { code: string }) => c.code === course.code)
      );
      
      const grades = studentsInCourse
        .map(student => student.courses
          .find((c: { code: string }) => c.code === course.code)?.grade?.percentage)
        .filter((grade): grade is number => grade !== undefined);

      return {
        ...course,
        studentCount: studentsInCourse.length,
        passRate: this.calculatePassRate(grades),
        averageGrade: grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : 0
      };
    });
  }

  private calculatePassRate(grades: number[]): number {
    if (!grades.length) return 0;
    const passed = grades.filter(grade => grade >= 60);
    return (passed.length / grades.length) * 100;
  }
} 