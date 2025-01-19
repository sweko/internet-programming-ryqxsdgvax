import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [RouterModule, CommonModule], // Add CommonModule here
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  totalStudents: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.apiService.getStudents().subscribe({
      next: (data: any) => {
        console.log('Fetched Students:', data);
        this.students = data;
        this.totalStudents = data.length;
      },
      error: (error) => console.error('Error fetching students:', error)
    });
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }
}
