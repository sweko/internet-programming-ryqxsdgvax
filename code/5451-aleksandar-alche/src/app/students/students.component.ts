import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Service } from '../services.service';
import { Student } from '../models';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private studentService: Service) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.totalPages = Math.ceil(students.length / 10);
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onDeleteStudent(student: Student): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(+student.id).subscribe(() => {
        this.students = this.students.filter(s => s.id !== student.id);
        this.totalPages = Math.ceil(this.students.length / 10);
      });
    }
  }
}