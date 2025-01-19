import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  totalStudents: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.apiService.getStudents().subscribe((data) => {
      this.students = data;
      this.totalStudents = data.length;
    });
  }

  onDeleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(() => {
        this.fetchStudents();
      });
    }
  }
}

