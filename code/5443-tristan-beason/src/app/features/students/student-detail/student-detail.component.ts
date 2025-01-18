import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Student } from '../../../models/student.interface';
import { ApiService } from '../../../services/api.service';
import { StateService } from '../../../services/state.service';
import { GradeService } from '../../../services/grade.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  student?: Student;
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private state: StateService,
    private gradeService: GradeService,
    private navigation: NavigationService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadStudent(id);
    } else {
      this.error = 'Invalid student ID';
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStudent(id: number): void {
    this.state.setLoading(true);
    this.api.getStudent(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (student) => {
        this.student = student;
        this.loading = false;
        this.state.setLoading(false);
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.error = 'Failed to load student details';
        this.loading = false;
        this.state.setLoading(false);
      }
    });
  }

  calculateAverageGrade(): number {
    if (!this.student) return 0;
    const grades = this.student.courses
      .filter(course => course.grade)
      .map(course => course.grade!.percentage);
    return this.gradeService.calculateAverageGrade(grades);
  }

  getLetterGrade(percentage: number): string {
    return this.gradeService.calculateLetterGrade(percentage);
  }

  calculateSuccessRate(): number {
    if (!this.student) return 0;
    const gradedCourses = this.student.courses.filter(c => c.grade);
    if (!gradedCourses.length) return 0;
    
    const passedCourses = gradedCourses.filter(c => 
      this.gradeService.isPassingGrade(c.grade!.percentage)
    );
    return Number(((passedCourses.length / gradedCourses.length) * 100).toFixed(1));
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  deleteStudent(): void {
    if (!this.student) return;
    
    if (confirm(`Are you sure you want to delete ${this.student.firstName} ${this.student.lastName}?`)) {
      this.state.setLoading(true);
      this.api.deleteStudent(this.student.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.state.removeStudent(this.student!.id);
          this.navigation.goToStudentList();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.error = 'Failed to delete student';
          this.state.setLoading(false);
        }
      });
    }
  }

  goBack(): void {
    this.navigation.goBack();
  }
} 