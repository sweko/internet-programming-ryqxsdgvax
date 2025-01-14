import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
  imports: [CommonModule, FormsModule] // Add imports here
})
export class StudentCreateComponent {
  newStudent: any = {};
  apiUrl = 'assets/db/students.json'; // Update to correct local path

  constructor(private http: HttpClient, private router: Router) {}

  createStudent() {
    this.http.post(this.apiUrl, this.newStudent).subscribe(
      () => {
        this.router.navigate(['/students']);
      },
      (error) => {
        console.error('Error creating student:', error);
      }
    );
  }

  navigateToList() {
    this.router.navigate(['/students']);
  }
}
