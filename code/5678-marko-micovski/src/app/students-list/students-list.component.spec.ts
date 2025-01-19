import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  students: any[] = []; // Array to store students

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.apiService.getStudents().subscribe(
      (data) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(
        () => {
          this.students = this.students.filter((student) => student.id !== id);
          alert('Student deleted successfully!');
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }
}
