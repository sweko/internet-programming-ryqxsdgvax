import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../models/student';
import { Degree } from '../models/degree';

const GRADE_SCALE = [
  { minPercentage: 90, letter: 'A' },
  { minPercentage: 80, letter: 'B' },
  { minPercentage: 70, letter: 'C' },
  { minPercentage: 60, letter: 'D' },
  { minPercentage: 0, letter: 'F' }
];

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayStudents: Student[] = [];
  degrees: string[] = [];
  courses: string[] = [];
  
  currentPage = 1;
  pageSize = 10;
  totalStudents = 0;
  
  sortColumn: keyof Student | 'averageGrade' | null = null;
  sortOrder: 'asc' | 'desc' = 'asc';
  nameDisplayFormat: 'firstLast' | 'lastFirst' = 'firstLast';
  
  searchTerm = '';
  selectedDegree = '';
  selectedYears: number[] = [];
  gradeRange: { min: number | null; max: number | null } = { min: null, max: null };
  
  constructor(
    private studentService: StudentService,
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.studentService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });

    this.studentService.getCourses().subscribe(courses => {
      this.courses = courses.map(course => course.name);
    });

    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.applyFilters();
    });
  }

  deleteStudent(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      return this.studentService.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter(student => student.id !== studentId);
        this.displayStudents = this.displayStudents.filter(student=> student.id !== studentId);
        alert('Author deleted successfully');
      });
    }
    return;
  }

  getDisplayName(student: Student): string {
    return this.nameDisplayFormat === 'firstLast' 
      ? `${student.firstName} ${student.lastName}`
      : `${student.lastName}, ${student.firstName}`;
  }

  calculateAverageGrade(student: Student): { percentage: number | null; letter: string } {
    const gradedCourses = student.courses.filter(c => c.grade);
    if (gradedCourses.length === 0) {
      return { percentage: null, letter: 'N/A' };
    }

    const totalPercentage = gradedCourses.reduce((sum, course) => 
      sum + (course.grade?.percentage || 0), 0);
    const averagePercentage = totalPercentage / gradedCourses.length;
    const roundedAverage = Math.round(averagePercentage * 100) / 100;

    const letterGrade = GRADE_SCALE.find(g => roundedAverage >= g.minPercentage)?.letter || 'F';
    
    return { percentage: roundedAverage, letter: letterGrade };
  }

  applyFilters() {
    let filtered = this.students;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(student => 
        student.studentId.toLowerCase().includes(term) ||
        this.getDisplayName(student).toLowerCase().includes(term)
      );
    }

    if (this.selectedDegree) {
      filtered = filtered.filter(student => student.degree === this.selectedDegree);
    }

    if (this.selectedYears.length > 0) {
      filtered = filtered.filter(student => this.selectedYears.includes(student.year));
    }

    if (this.gradeRange.min !== null || this.gradeRange.max !== null) {
      filtered = filtered.filter(student => {
        const avg = this.calculateAverageGrade(student).percentage;
        if (avg === null) return false;
        
        if (this.gradeRange.min !== null && avg < this.gradeRange.min) return false;
        if (this.gradeRange.max !== null && avg > this.gradeRange.max) return false;
        
        return true;
      });
    }

    this.totalStudents = filtered.length;
    this.applySorting(filtered);
    this.applyPagination(filtered);
  }

  applySorting(students: Student[]) {
    if (!this.sortColumn) return;

    students.sort((a, b) => {
      let comparison = 0;

      switch (this.sortColumn) {
        case 'studentId':
          comparison = a.studentId.localeCompare(b.studentId);
          break;
        case 'firstName':
        case 'lastName':
          const nameA = this.getDisplayName(a);
          const nameB = this.getDisplayName(b);
          comparison = nameA.localeCompare(nameB);
          break;
        case 'degree':
          comparison = a.degree.localeCompare(b.degree);
          break;
        case 'year':
          comparison = a.year - b.year;
          break;
        case 'email':
          comparison = a.email.localeCompare(b.email);
          break;
        case 'averageGrade':
          const avgA = this.calculateAverageGrade(a).percentage || 0;
          const avgB = this.calculateAverageGrade(b).percentage || 0;
          comparison = avgA - avgB;
          break;
      }

      return this.sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  applyPagination(students: Student[]) {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayStudents = students.slice(startIndex, startIndex + this.pageSize);
  }

  sort(column: keyof Student | 'averageGrade') {
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
      return '↕️';
    }
    return this.sortOrder === 'asc' ? '↑' : '↓';
  }

  toggleNameFormat() {
    this.nameDisplayFormat = this.nameDisplayFormat === 'firstLast' ? 'lastFirst' : 'firstLast';
    if (this.sortColumn === 'firstName' || this.sortColumn === 'lastName') {
      this.applyFilters();
    }
  }

  getGradedCoursesCount(student: Student): number {
    return student.courses.filter(c => c.grade).length;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.applyFilters();
  }

  get totalPages(): number {
    return Math.ceil(this.totalStudents / this.pageSize);
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}