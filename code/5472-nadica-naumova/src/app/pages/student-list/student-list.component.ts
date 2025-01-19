import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { DegreeService } from '../../services/degree.service';
import { Student } from '../../interfaces/student.interface';
import { Degree } from '../../interfaces/degree.interface';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold">Students</h1>
        <button 
          routerLink="/students/create"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
      </div>

      <!-- Filters -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          [(ngModel)]="filters.searchTerm"
          (ngModelChange)="applyFilters()"
          placeholder="Search by ID or Name..."
          class="p-2 border rounded"
        />

        <select
          [(ngModel)]="filters.degree"
          (ngModelChange)="applyFilters()"
          class="p-2 border rounded"
        >
          <option value="">All Degrees</option>
          @for (degree of degrees; track degree.code) {
            <option [value]="degree.code">{{degree.name}}</option>
          }
        </select>

        <select
          [(ngModel)]="filters.year"
          (ngModelChange)="applyFilters()"
          class="p-2 border rounded"
        >
          <option value="">All Years</option>
          @for (year of [1,2,3,4]; track year) {
            <option [value]="year">Year {{year}}</option>
          }
        </select>

        <div class="flex gap-2">
          <input
            type="number"
            [(ngModel)]="filters.minGrade"
            (ngModelChange)="applyFilters()"
            placeholder="Min Grade"
            class="p-2 border rounded w-1/2"
            min="0"
            max="100"
          />
          <input
            type="number"
            [(ngModel)]="filters.maxGrade"
            (ngModelChange)="applyFilters()"
            placeholder="Max Grade"
            class="p-2 border rounded w-1/2"
            min="0"
            max="100"
          />
        </div>
      </div>

      <!-- Display Format Toggle -->
      <div class="mb-4">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            [checked]="nameFormat === 'lastFirst'"
            (change)="toggleNameFormat()"
            class="form-checkbox"
          >
          <span class="ml-2">Show "LastName, FirstName" format</span>
        </label>
      </div>

      <!-- Students Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-100">
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  (click)="sort('studentId')">
                Student ID {{getSortIcon('studentId')}}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  (click)="sort('lastName')">
                Name {{getSortIcon('lastName')}}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  (click)="sort('degree')">
                Degree {{getSortIcon('degree')}}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  (click)="sort('year')">
                Year {{getSortIcon('year')}}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Average Grade
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            @for (student of filteredStudents; track student.id) {
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">{{student.studentId}}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{studentService.getFullName(student, nameFormat)}}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{student.degree}}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{student.year}}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{student.email}}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  @if (studentService.calculateAverageGrade(student)) {
                    {{studentService.calculateAverageGrade(student)}}%
                  } @else {
                    N/A
                  }
                </td>
                <td class="px-6 py-4 whitespace-nowrap space-x-2">
                  <button 
                    [routerLink]="['/students', student.id]"
                    class="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button 
                    [routerLink]="['/students', student.id, 'edit']"
                    class="text-green-600 hover:text-green-900">
                    Edit
                  </button>
                  <button 
                    (click)="deleteStudent(student)"
                    class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            }
            @if (filteredStudents.length === 0) {
              <tr>
                <td colspan="7" class="px-6 py-4 text-center">No students found</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Results Count -->
      <div class="mt-4 text-gray-600">
        Showing {{filteredStudents.length}} of {{students.length}} students
      </div>
    </div>
  `
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  degrees: Degree[] = [];
  nameFormat: 'firstLast' | 'lastFirst' = 'firstLast';
  
  sortField: keyof Student = 'studentId';
  sortDirection: 'asc' | 'desc' = 'asc';

  filters = {
    searchTerm: '',
    degree: '',
    year: '',
    minGrade: null as number | null,
    maxGrade: null as number | null
  };

  constructor(
    public studentService: StudentService,
    private degreeService: DegreeService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadDegrees();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.applyFilters();
      },
      error: (error) => console.error('Error loading students:', error)
    });
  }

  loadDegrees(): void {
    this.degreeService.getDegrees().subscribe({
      next: (degrees) => {
        this.degrees = degrees;
      },
      error: (error) => console.error('Error loading degrees:', error)
    });
  }

  toggleNameFormat(): void {
    this.nameFormat = this.nameFormat === 'firstLast' ? 'lastFirst' : 'firstLast';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.students];

    if (this.filters.searchTerm) {
      const searchTerm = this.filters.searchTerm.toLowerCase();
      filtered = filtered.filter(student => 
        student.studentId.toLowerCase().includes(searchTerm) ||
        student.firstName.toLowerCase().includes(searchTerm) ||
        student.lastName.toLowerCase().includes(searchTerm)
      );
    }

    if (this.filters.degree) {
      filtered = filtered.filter(student => 
        student.degree === this.filters.degree
      );
    }

    if (this.filters.year) {
      filtered = filtered.filter(student => 
        student.year === Number(this.filters.year)
      );
    }

    if (this.filters.minGrade !== null) {
      filtered = filtered.filter(student => {
        const avg = this.studentService.calculateAverageGrade(student);
        return avg !== null && avg >= (this.filters.minGrade ?? 0);
      });
    }

    if (this.filters.maxGrade !== null) {
      filtered = filtered.filter(student => {
        const avg = this.studentService.calculateAverageGrade(student);
        return avg !== null && avg <= (this.filters.maxGrade ?? 100);
      });
    }

    this.filteredStudents = this.sortStudents(filtered);
  }

  sort(field: keyof Student): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filteredStudents = this.sortStudents(this.filteredStudents);
  }

  sortStudents(students: Student[]): Student[] {
    return [...students].sort((a, b) => {
      let aValue = a[this.sortField];
      let bValue = b[this.sortField];

      // Special handling for name sorting
      if (this.sortField === 'lastName') {
        aValue = this.studentService.getFullName(a, this.nameFormat);
        bValue = this.studentService.getFullName(b, this.nameFormat);
      }

      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  getSortIcon(field: keyof Student): string {
    if (this.sortField !== field) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  deleteStudent(student: Student): void {
    if (confirm(`Are you sure you want to delete ${this.studentService.getFullName(student)}?`)) {
      this.studentService.deleteStudent(student.id).subscribe({
        next: () => {
          this.students = this.students.filter(s => s.id !== student.id);
          this.applyFilters();
        },
        error: (error) => console.error('Error deleting student:', error)
      });
    }
  }
}