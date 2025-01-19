import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, catchError, finalize, EMPTY, BehaviorSubject, combineLatest, map, startWith, shareReplay } from 'rxjs';
import { Student } from '../../../models/student.interface';
import { ApiService } from '../../../services/api.service';
import { StateService } from '../../../services/state.service';
import { GradeService } from '../../../services/grade.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnDestroy {
  // Data
  students: Student[] = [];
  filteredStudents: Student[] = [];
  degrees: string[] = [];
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  
  // Filters
  searchTerm = '';
  selectedDegree = '';
  selectedYears: number[] = [];
  minGrade?: number;
  maxGrade?: number;
  
  // Display options
  nameFormat: 'firstLast' | 'lastFirst' = 'firstLast';
  sortField: keyof Student | 'averageGrade' = 'studentId';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  private destroy$ = new Subject<void>();
  loading$ = new BehaviorSubject<boolean>(true);
  error$ = new BehaviorSubject<string>('');

  students$ = this.api.getStudents().pipe(shareReplay(1));

  gradeRange = this.fb.group({
    min: [0, [Validators.min(0), Validators.max(100)]],
    max: [100, [Validators.min(0), Validators.max(100)]]
  });

  filteredStudents$ = combineLatest([
    this.students$,
    this.gradeRange.valueChanges.pipe(
      startWith({ min: 0, max: 100 })
    )
  ]).pipe(
    map(([students, range]) => 
      this.filterByGradeRange(students, range as { min: number; max: number })
    )
  );

  constructor(
    private api: ApiService,
    private state: StateService,
    private gradeService: GradeService,
    private fb: FormBuilder,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.navigationService.setTitle('Students');
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.state.setLoading(true);
    
    // Load students
    this.api.getStudents().pipe(
      takeUntil(this.destroy$),
      catchError(error => {
        this.error$.next('Failed to load students. Please try again.');
        return EMPTY;
      }),
      finalize(() => this.loading$.next(false))
    ).subscribe({
      next: (students) => {
        this.students = students;
        this.state.setStudents(students);
        this.applyFilters();
        this.state.setLoading(false);
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.state.setError('Failed to load students');
        this.state.setLoading(false);
      }
    });

    // Load degrees for filter
    this.api.getDegrees().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (degrees) => {
        this.degrees = degrees.map(d => d.code);
        this.state.setDegrees(degrees);
      },
      error: (error) => {
        console.error('Error loading degrees:', error);
      }
    });
  }

  formatName(student: Student): string {
    return this.nameFormat === 'firstLast' 
      ? `${student.firstName} ${student.lastName}`
      : `${student.lastName}, ${student.firstName}`;
  }

  calculateAverageGrade(student: Student): number {
    const grades = student.courses
      .filter(course => course.grade)
      .map(course => course.grade!.percentage);
    return this.gradeService.calculateAverageGrade(grades);
  }

  getLetterGrade(percentage: number): string {
    return this.gradeService.calculateLetterGrade(percentage);
  }

  deleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete ${this.formatName(student)}?`)) {
      this.state.setLoading(true);
      this.api.deleteStudent(student.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.state.removeStudent(student.id);
          this.loadData();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.state.setError('Failed to delete student');
          this.state.setLoading(false);
        }
      });
    }
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = this.searchTerm 
        ? (this.formatName(student) + student.studentId)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        : true;

      const matchesDegree = this.selectedDegree 
        ? student.degree === this.selectedDegree 
        : true;

      const matchesYear = this.selectedYears.length 
        ? this.selectedYears.includes(student.year)
        : true;

      const avgGrade = this.calculateAverageGrade(student);
      const matchesGrade = (
        (!this.minGrade || avgGrade >= this.minGrade) &&
        (!this.maxGrade || avgGrade <= this.maxGrade)
      );

      return matchesSearch && matchesDegree && matchesYear && matchesGrade;
    });

    this.sortStudents();
  }

  private sortStudents(): void {
    this.filteredStudents.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      if (this.sortField === 'averageGrade') {
        valueA = this.calculateAverageGrade(a);
        valueB = this.calculateAverageGrade(b);
      } else {
        valueA = a[this.sortField];
        valueB = b[this.sortField];
      }

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.pageSize);
  }

  get paginatedStudents(): Student[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredStudents.slice(start, start + this.pageSize);
  }

  getGradedCoursesCount(student: Student): number {
    return student.courses.filter(course => course.grade !== undefined).length;
  }

  onYearChange(year: number): void {
    this.selectedYears = this.selectedYears.includes(year)
      ? this.selectedYears.filter(y => y !== year)
      : [...this.selectedYears, year];
    this.applyFilters();
  }

  onSort(field: keyof Student | 'averageGrade'): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  onPageChange(delta: number): void {
    this.currentPage += delta;
  }

  filterByGradeRange(students: Student[], range: { min: number; max: number }): Student[] {
    return students.filter(student => {
      const avgGrade = this.calculateAverageGrade(student);
      return avgGrade >= range.min && avgGrade <= range.max;
    });
  }

  retry(): void {
    this.loadData();
  }
} 