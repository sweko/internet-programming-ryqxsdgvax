import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  searchQuery: string = '';
  selectedDegree: string = '';
  selectedYear: number[] = [];

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        this.students = data;
        this.totalItems = this.students.length;
        this.applyFilters();
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredStudents = this.students
      .filter(student => this.filterBySearchQuery(student))
      .filter(student => this.filterByDegree(student))
      .filter(student => this.filterByYear(student));
  }

  filterBySearchQuery(student: any): boolean {
    return student.studentId.includes(this.searchQuery) || 
           `${student.firstName} ${student.lastName}`.toLowerCase().includes(this.searchQuery.toLowerCase());
  }

  filterByDegree(student: any): boolean {
    return this.selectedDegree ? student.degree === this.selectedDegree : true;
  }

  filterByYear(student: any): boolean {
    return this.selectedYear.length ? this.selectedYear.includes(student.year) : true;
  }

  viewStudent(id: number): void {
    this.router.navigate(['/students', id]);
  }

  editStudent(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.loadStudents(); // Reload the student list after deletion
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }

  // Pagination methods
  get paginatedStudents(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Additional methods for sorting and filtering can be added here
}

