import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { ApiService } from '../../services/student.service';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getStudents().subscribe((data) => (this.students = data));
  }
}

