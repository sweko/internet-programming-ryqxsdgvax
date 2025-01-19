import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  errorMessage: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  searchQuery: string = '';
  sortColumn: string = '';
  sortDirection: boolean = true; // true for ascending, false for descending

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.totalItems = data.length; 
      },
      error: (error) => {
        this.errorMessage = 'Error fetching students: ' + error.message;
      }
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.fetchStudents();
        },
        error: (error) => {
          this.errorMessage = 'Error deleting student: ' + error.message;
        }
      });
    }
  }

  get paginatedStudents(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.students.slice(startIndex, startIndex + this.itemsPerPage);
  }

  searchStudents(): void {
    this.currentPage = 1; 
    this.fetchStudents(); 
  }

  sort(column: string): void {
    this.sortDirection = this.sortColumn === column ? !this.sortDirection : true;
    this.sortColumn = column;

    this.students.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue < bValue) return this.sortDirection ? -1 : 1;
      if (aValue > bValue) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }
}
