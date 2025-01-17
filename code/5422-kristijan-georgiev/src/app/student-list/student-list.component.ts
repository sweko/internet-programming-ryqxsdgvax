import { Component, OnInit } from '@angular/core';
import { Student } from '../models/grade';
import { StudentsService } from '../services/students.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent implements OnInit{
  students: Student[] = [];
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  firstnamefilter: string = '';
  constructor(private studentService: StudentsService, private router: Router) { }

  ngOnInit(): void {
    this.getStudents();
  }
  sortByID(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    this.students.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.id - b.id;
      } else {
        return b.id - a.id;
      }
    });
  }
  
  sortByFirstName(): void {

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';


    this.students.sort((a, b) => {
      const firstnameA = a.firstName.toLowerCase();
      const firstnameB = b.firstName.toLowerCase();

      if (firstnameA < firstnameB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (firstnameA > firstnameB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students = students;
      console.log(students);
    });
  }

  applyFilters(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.students= this.filterStudents(students);
    });
  }

  filterStudents(students: Student[]): Student[] {
    return students.filter(student =>
      this.filterByFirstName(student)
    )
  }

  filterByFirstName(students: Student): boolean {
    return this.firstnamefilter === '' || students.firstName.toLowerCase().includes(this.firstnamefilter.toLowerCase());
  }
  
  viewStudentDetails(student: Student): void {
    this.router.navigate(['/student-detail', student.id]);
  }

  editStudent(student: Student): void {
    this.router.navigate(['/student-edit', student.id]);
  }

  deleteStudent(student: Student): void {
    if (confirm('Do you want to delete the student')) {
      this.getStudents.deleteStudent(student.id).subscribe(() => {
        this.getStudents();
      });
    }
  }
}
