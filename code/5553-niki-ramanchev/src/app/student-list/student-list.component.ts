import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  imports: [NgFor, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  displayedStudents: any[] = [];
  errorMessage = '';
  currentPage = 1;
  pageSize = 10;
  totalStudents = 0;

  displayFormat: 'firstNameLastName' | 'lastNameFirstName' = 'firstNameLastName';
  sortColumn: string = 'studentId';
  sortAscending: boolean = true;

  // Filtering fields
  filterText = '';
  filterDegree = '';
  filterYears: number[] = [];
  filterGradeMin = 0;
  filterGradeMax = 100;
  filterLetterMin = 'A';
  filterLetterMax = 'F';

  degrees: string[] = ['CS', 'SE', 'IT', 'DS', 'CE']; 
  gradeLetters = ['A', 'B', 'C', 'D', 'F'];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.totalStudents = data.length;
        this.applyFilters(); 
      },
      error: (err) => (this.errorMessage = 'Failed to fetch students. Please try again later.'),
    });
  }

  applyFilters(): void {
    console.log('Applying filters...'); 
    this.displayedStudents = this.students.filter((student) => {
      const matchesText =
        student.studentId.includes(this.filterText) ||
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.filterText.toLowerCase()) ||
        `${student.lastName}, ${student.firstName}`.toLowerCase().includes(this.filterText.toLowerCase());
  
      const matchesDegree = this.filterDegree ? student.degreeName === this.filterDegree : true;
  
      const matchesYear = this.filterYears.length ? this.filterYears.includes(student.year) : true;
  
      const matchesGrade =
        student.averageGrade >= this.filterGradeMin && student.averageGrade <= this.filterGradeMax;
  
      const matchesLetter =
        this.gradeLetters.indexOf(student.letterGrade) <= this.gradeLetters.indexOf(this.filterLetterMin) &&
        this.gradeLetters.indexOf(student.letterGrade) >= this.gradeLetters.indexOf(this.filterLetterMax);
  
      return matchesText && matchesDegree && matchesYear && matchesGrade && matchesLetter;
    });
  
    console.log('Filtered Students:', this.displayedStudents); 
    this.updateDisplayedStudents();
  }
  

  updateDisplayedStudents(): void {
    const sortedStudents = this.students.sort((a, b) => this.compareValues(a, b));
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedStudents = sortedStudents.slice(startIndex, startIndex + this.pageSize);
  }

  compareValues(a: any, b: any): number {
    const fieldA = a[this.sortColumn];
    const fieldB = b[this.sortColumn];

    if (fieldA < fieldB) return this.sortAscending ? -1 : 1;
    if (fieldA > fieldB) return this.sortAscending ? 1 : -1;
    return 0;
  }

  toggleDisplayFormat(): void {
    this.displayFormat =
      this.displayFormat === 'firstNameLastName' ? 'lastNameFirstName' : 'firstNameLastName';
    this.updateDisplayedStudents();
  }

  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortColumn = column;
      this.sortAscending = true;
    }
    this.updateDisplayedStudents();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updateDisplayedStudents();
  }

  viewStudent(id: number): void {
    this.router.navigate([`/students/${id}`]);
  }

  editStudent(id: number): void {
    this.router.navigate([`/students/${id}/edit`]);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.fetchStudents(),
        error: (err) => (this.errorMessage = 'Failed to delete the student. Please try again later.'),
      });
    }
  }

  addNewStudent(): void {
    this.router.navigate(['/students/create']);
  }

  getTotalPages(): number {
    return Math.ceil(this.totalStudents / this.pageSize);
  }
}
