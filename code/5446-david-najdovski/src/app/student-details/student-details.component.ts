import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  imports: [CommonModule, FormsModule] // Add imports here
})
export class StudentDetailsComponent implements OnInit {
  student: any;
  apiUrl = 'https://localhost:3000/students';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
}
