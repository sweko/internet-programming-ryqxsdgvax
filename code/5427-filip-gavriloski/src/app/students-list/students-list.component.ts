import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, Student } from '../api.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  displayFormat: 'fullName' | 'lastFirst' = 'fullName';
  searchQuery: string = '';
  sortField: 'name' | 'age' = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.apiService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  toggleDisplayFormat(): void {
    this.displayFormat = this.displayFormat === 'fullName' ? 'lastFirst' : 'fullName';
  }

  deleteStudent(id: number): void {
    this.apiService.deleteStudent(id).subscribe(() => {
      this.fetchStudents(); // Refresh the list after deletion
    });
  }

  viewStudent(id: number): void {
    this.router.navigate(['/students', id]);
  }

  editStudent(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  get filteredStudents(): Student[] {
    return this.students
      .filter(student => 
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const fieldA = this.sortField === 'name' ? a.name : a.age;
        const fieldB = this.sortField === 'name' ? b.name : b.age;
        return this.sortOrder === 'asc' ? (fieldA > fieldB ? 1 : -1) : (fieldA < fieldB ? 1 : -1);
      });
  }

  get paginatedStudents(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  sortStudents(field: 'name' | 'age'): void {
    this.sortField = field;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
}
