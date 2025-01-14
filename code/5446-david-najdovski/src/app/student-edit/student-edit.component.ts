import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  imports: [CommonModule, FormsModule] // Add imports here
})
export class StudentEditComponent implements OnInit {
  student: any;
  apiUrl = 'https://localhost:3000/students';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.fetchStudentDetails(studentId);
  }

  fetchStudentDetails(id: string | null) {
    this.http.get(`${this.apiUrl}/${id}`).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  saveStudent() {
    this.http.put(`${this.apiUrl}/${this.student.id}`, this.student).subscribe(
      () => {
        this.router.navigate(['/students', this.student.id]);
      },
      (error) => {
        console.error('Error saving student:', error);
      }
    );
  }

  navigateToList() {
    this.router.navigate(['/students']);
  }
}
