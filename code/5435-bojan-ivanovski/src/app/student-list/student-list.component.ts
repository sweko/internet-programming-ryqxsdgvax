import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';
import { Degree } from '../models/degree';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    ConfirmationdialogComponent,
    MatIconModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  degrees: Degree[] = [];

  pageSize = 10;
  currentPage = 0;
  totalStudents = 0;

  currentSortColumn = '';
  isAscending = true;

  searchText = '';
  selectedDegree = '';
  selectedYears: number[] = [];

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
    this.fetchDegrees();
  }

  addStudent(): void {
    this.router.navigate(['/students/create']);
  }

  fetchStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.applyFiltersAndSort();
      },
      error: (error) => console.error('Error fetching students:', error),
    });
  }

  fetchDegrees(): void {
    this.studentsService.getDegrees().subscribe({
      next: (degrees) => (this.degrees = degrees),
      error: (error) => console.error('Error fetching degrees:', error),
    });
  }

  formatName(student: Student): string {
    return `${student.firstName} ${student.lastName}`;
  }

  getDegreeName(degreeCode: string): string {
    const degree = this.degrees.find((d) => d.code === degreeCode);
    return degree ? degree.name : degreeCode;
  }

  applyFiltersAndSort(): void {
    this.filteredStudents = this.students.filter((student) => {
      const matchesSearch =
        !this.searchText ||
        student.studentId
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        student.firstName
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        student.lastName.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesDegree =
        !this.selectedDegree || student.degree === this.selectedDegree;

      const matchesYear =
        this.selectedYears.length === 0 ||
        this.selectedYears.includes(student.year);

      return matchesSearch && matchesDegree && matchesYear;
    });

    if (this.currentSortColumn) {
      this.sortData(this.currentSortColumn);
    }

    this.totalStudents = this.filteredStudents.length;
  }

  sortData(column: string): void {
    if (this.currentSortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.currentSortColumn = column;
      this.isAscending = true;
    }

    this.filteredStudents.sort((a, b) => {
      const multiplier = this.isAscending ? 1 : -1;
      const valueA = this.getSortValue(a, column);
      const valueB = this.getSortValue(b, column);
      return valueA < valueB
        ? -1 * multiplier
        : valueA > valueB
        ? 1 * multiplier
        : 0;
    });
  }
  getSortValue(student: Student, column: string): any {
    switch (column) {
      case 'name':
        return this.formatName(student);
      case 'degree':
        return this.getDegreeName(student.degree);
      case 'averageGrade':
        return this.calculateAverageGrade(student);
      case 'numberOfGrades':
        return this.getNumberOfGrades(student);
      default:
        return student[column as keyof Student];
    }
  }

  calculateAverageGrade(student: Student): string {
    const grades = student.courses
      .filter((course) => course.grade)
      .map((course) => course.grade!.percentage);

    if (grades.length === 0) return 'N/A';
    const average = grades.reduce((a, b) => a + b) / grades.length;
    return average.toFixed(2);
  }

  getNumberOfGrades(student: Student): number {
    return student.courses.filter((course) => course.grade).length;
  }

  resetFilters(): void {
    this.searchText = '';
    this.selectedDegree = '';
    this.selectedYears = [];
    this.currentSortColumn = '';
    this.isAscending = true;
    this.applyFiltersAndSort();
  }

  viewStudent(id: number): void {
    this.router.navigate(['/students', id]);
  }

  editStudent(id: number): void {
    this.router.navigate([`/students/${id}/edit`]);
  }

  deleteStudent(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this student?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.studentsService.deleteStudent(id).subscribe({
          next: () => {
            this.fetchStudents();
          },
          error: (error) => {
            console.error('Error deleting student:', error);
          },
        });
      }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getPaginatedStudents(): Student[] {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredStudents.slice(start, end);
  }
}
