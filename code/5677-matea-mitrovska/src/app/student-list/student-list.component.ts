import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.api.getStudents().subscribe((data: any) => {
      this.students = data;
    });
  }

  viewStudent(id: number) {
    // Navigate to student details
  }

  editStudent(id: number) {
    // Navigate to edit form
  }

  deleteStudent(id: number) {
    // Call API to delete student
  }
}
