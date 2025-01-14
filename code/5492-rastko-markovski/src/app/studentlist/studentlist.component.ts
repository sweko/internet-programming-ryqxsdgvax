import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentsService } from '../students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-studentlist',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.css'
})
export class StudentlistComponent {
  students: Student[] = [];
  displayStudents: Student[] = [];
  search: string = '';

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.getStudents().subscribe(students => {
      this.students = students;
      this.displayStudents = students;
    });
  }

  filterStudents() {
    const searchTerm = this.search.toLowerCase();
    this.displayStudents = this.students.filter(student =>
      `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm) ||
      student.studentId.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm)
    );
  }

  deleteStudent(studentId: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentsService.deleteStudent(studentId).subscribe(() => {
        this.students = this.students.filter(student => student.id !== studentId);
        this.displayStudents = this.displayStudents.filter(student => student.id !== studentId);
      });
    }
  }
}

