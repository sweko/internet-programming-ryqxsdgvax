import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { StudentUtilsService } from '../services/student-utils.service';
import { Student } from '../../../models/student.interface';
import { Degree } from '../../../models/degree.interface';
import { Dialog } from '@angular/cdk/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  degrees: Degree[] = [];
  filteredStudents: Student[] = [];
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  
  // Sorting and display
  lastNameFirst = false;
  sortField: keyof Student | 'averageGrade' = 'studentId';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filters
  searchTerm = '';
  selectedDegree = '';
  selectedYears: number[] = [];
  minGrade?: number;
  maxGrade?: number;
  minLetterGrade = '';
  maxLetterGrade = '';
  letterGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

  constructor(
    private apiService: ApiService,
    public studentUtils: StudentUtilsService,
    private dialog: Dialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadDegrees();
  }

  private loadStudents(): void {
    this.apiService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.applyFilters();
      },
      error: (error) => console.error('Error loading students:', error)
    });
  }

  private loadDegrees(): void {
    this.apiService.getDegrees().subscribe({
      next: (degrees) => this.degrees = degrees,
      error: (error) => console.error('Error loading degrees:', error)
    });
  }

  applyFilters(): void {
    let filtered = [...this.students];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(student => 
        student.studentId.toLowerCase().includes(term) ||
        this.studentUtils.getFullName(student).toLowerCase().includes(term)
      );
    }

    // Apply degree filter
    if (this.selectedDegree) {
      filtered = filtered.filter(student => 
        student.degree === this.selectedDegree
      );
    }

    // Apply year filter
    if (this.selectedYears.length > 0) {
      filtered = filtered.filter(student => 
        this.selectedYears.includes(student.year)
      );
    }

    // Apply grade range filter
    if (this.minGrade !== undefined || this.maxGrade !== undefined) {
      filtered = filtered.filter(student => {
        const avgGrade = this.studentUtils.calculateAverageGrade(student);
        if (!avgGrade) return false;
        
        if (this.minGrade !== undefined && avgGrade < this.minGrade) return false;
        if (this.maxGrade !== undefined && avgGrade > this.maxGrade) return false;
        return true;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (this.sortField === 'averageGrade') {
        const aValue = this.studentUtils.calculateAverageGrade(a) ?? -1;
        const bValue = this.studentUtils.calculateAverageGrade(b) ?? -1;
        return this.sortDirection === 'desc' ? bValue - aValue : aValue - bValue;
      }

      const aValue = a[this.sortField as keyof Student];
      const bValue = b[this.sortField as keyof Student];
      return this.sortDirection === 'desc' 
        ? String(bValue).localeCompare(String(aValue))
        : String(aValue).localeCompare(String(bValue));
    });

    this.filteredStudents = filtered;
  }

  get paginatedStudents(): Student[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredStudents.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStudents.length / this.pageSize);
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

  onDelete(student: Student): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Student',
        message: `Are you sure you want to delete ${this.studentUtils.getFullName(student)}?`
      },
      hasBackdrop: true,
      backdropClass: 'dialog-backdrop',
      panelClass: 'dialog-panel'
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.apiService.deleteStudent(student.id).subscribe({
          next: () => {
            this.students = this.students.filter(s => s.id !== student.id);
            this.applyFilters();
          },
          error: (error) => console.error('Error deleting student:', error)
        });
      }
    });
  }

  toggleNameFormat(): void {
    this.lastNameFirst = !this.lastNameFirst;
    this.applyFilters();
  }

  toggleYear(year: number): void {
    if (this.selectedYears.includes(year)) {
      this.selectedYears = this.selectedYears.filter(y => y !== year);
    } else {
      this.selectedYears.push(year);
    }
    this.applyFilters();
  }

  getGradedCoursesCount(student: Student): number {
    return student.courses.filter(c => c.grade).length;
  }

  onMinLetterGradeChange(): void {
    if (this.minLetterGrade) {
      this.minGrade = this.getGradePercentage(this.minLetterGrade);
    }
    this.applyFilters();
  }

  onMaxLetterGradeChange(): void {
    if (this.maxLetterGrade) {
      this.maxGrade = this.getGradePercentage(this.maxLetterGrade);
    }
    this.applyFilters();
  }

  private getGradePercentage(letter: string): number {
    switch(letter) {
      case 'A+': return 97;
      case 'A': return 93;
      case 'A-': return 90;
      case 'B+': return 87;
      case 'B': return 83;
      case 'B-': return 80;
      case 'C+': return 77;
      case 'C': return 73;
      case 'C-': return 70;
      case 'D+': return 67;
      case 'D': return 63;
      case 'D-': return 60;
      case 'F': return 0;
      default: return 0;
    }
  }
} 