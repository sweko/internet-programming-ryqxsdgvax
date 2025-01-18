import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StudentsService } from '../students.service';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';

  constructor(private studentService: StudentsService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (students) => {
        this.students = students;
        this.filteredStudents = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
        
      }
    );
  }

  onSearchChange(): void {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredStudents = this.students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.studentId.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) 
    );
  }

  removeStudent(studentId: number): void {
    if (confirm('Do you want to delete the student?')) {
      this.studentService.deleteStudent(studentId).subscribe(
        () => {
          this.students = this.students.filter((student) => student.id !== studentId);
          this.filteredStudents = this.filteredStudents.filter((student) => student.id !== studentId);
        },
        (error) => {
          console.error('Error deleting student:', error);
          
        }
      );
    }
  }
}