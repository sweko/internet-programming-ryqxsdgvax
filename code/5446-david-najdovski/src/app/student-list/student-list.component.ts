import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
  imports: [CommonModule, FormsModule] // Add imports here
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  apiUrl = 'assets/db/students.json'; // Update to correct local path

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.http.get<any>(this.apiUrl).subscribe(
      (data) => {
        console.log('Fetched data:', data); // Log the entire fetched data
        this.students = data.students; // Access the students array
        console.log('Students array:', this.students); // Log the students array
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  navigateToCreate() {
    this.router.navigate(['/student-create']);
  }

  navigateToEdit(studentId: number) {
    this.router.navigate(['/student-edit', studentId]);
  }

  deleteStudent(studentId: number) {
    // Implement deletion logic here
    console.log(`Deleting student with ID: ${studentId}`);
  }
}
