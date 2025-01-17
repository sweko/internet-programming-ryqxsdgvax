import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalStudents: number = 0;
  sortField: string = 'firstName';
  sortDirection: boolean = true; // true for ascending, false for descending
  nameFormat: string = 'firstLast'; // 'firstLast' or 'lastFirst'

  // Filters
  searchQuery: string = '';
  selectedDegree: string = '';
  selectedYears: number[] = [];
  minGrade: number | null = null;
  maxGrade: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe(
      (students: Student[]) => {
        this.students = students;
        this.filteredStudents = [...students];
        this.totalStudents = students.length;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  // Pagination
  get paginatedStudents(): Student[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredStudents.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  // Toggle Name Format
  toggleNameFormat(): void {
    this.nameFormat = this.nameFormat === 'firstLast' ? 'lastFirst' : 'firstLast';
  }

  // Sorting
  sort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = !this.sortDirection; // Toggle sort direction
    } else {
      this.sortField = field;
      this.sortDirection = true; // Default to ascending
    }
    this.filteredStudents.sort((a, b) => {
      const valueA = (a as any)[field];
      const valueB = (b as any)[field];
      if (valueA < valueB) return this.sortDirection ? -1 : 1;
      if (valueA > valueB) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }

  // Filters
  applyFilters(): void {
    this.filteredStudents = this.students.filter((student) => {
      // Search Query Filter
      const matchesSearch = this.searchQuery
        ? `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          student.studentId.includes(this.searchQuery)
        : true;

      // Degree Filter
      const matchesDegree = this.selectedDegree
        ? student.degree === this.selectedDegree
        : true;

      // Year Filter
      const matchesYear = this.selectedYears.length
        ? this.selectedYears.includes(student.year)
        : true;

      // Grade Range Filter
      const courseGrades = student.courses
        .filter((course) => course.grade)
        .map((course) => course.grade!.percentage);
      const averageGrade =
        courseGrades.length > 0
          ? courseGrades.reduce((a, b) => a + b, 0) / courseGrades.length
          : null;
      const matchesMinGrade = this.minGrade !== null ? averageGrade! >= this.minGrade : true;
      const matchesMaxGrade = this.maxGrade !== null ? averageGrade! <= this.maxGrade : true;

      return (
        matchesSearch && matchesDegree && matchesYear && matchesMinGrade && matchesMaxGrade
      );
    });
    this.totalStudents = this.filteredStudents.length;
    this.changePage(1); // Reset to first page after applying filters
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(
        () => {
          this.students = this.students.filter((student) => student.id !== id);
          this.applyFilters();
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }
}
