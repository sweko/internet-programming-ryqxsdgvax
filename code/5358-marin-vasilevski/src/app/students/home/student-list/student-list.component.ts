import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
 
  students: { id: number; firstName: string; lastName: string; studentId: string; email: string }[] = [];
  filteredStudents: {
[x: string]: any; id: number; firstName: string; lastName: string; studentId: string; email: string 
}[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.loadStudents();
  }

  private loadStudents(): void {
   
    this.students = [
      { id: 1, firstName: 'John', lastName: 'Doe', studentId: '2023-0001', email: 'john.doe@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', studentId: '2023-0002', email: 'jane.smith@example.com' },
    ];
    this.filteredStudents = [...this.students];
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
      this.students = this.students.filter((student) => student.id !== studentId);
      this.filteredStudents = this.filteredStudents.filter((student) => student.id !== studentId);
    }
  }
}


