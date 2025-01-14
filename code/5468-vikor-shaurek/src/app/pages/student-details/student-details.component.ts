import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student?: Student; // Holds the student details
  isLoading: boolean = true; // Indicates if the data is still loading
  errorMessage: string = ''; // Holds any error messages

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract the student ID from the route parameter
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.errorMessage = 'Invalid student ID.';
      this.isLoading = false;
      return;
    }

    // Fetch the student details from the API
    this.apiService.getStudent(id).subscribe({
      next: (data) => {
        this.student = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to fetch student details', err);
        this.errorMessage = 'Failed to fetch student details. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  onDelete(): void {
    if (!this.student) {
      return;
    }

    // Confirm before deletion
    const confirmDelete = confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      this.apiService.deleteStudent(this.student.id).subscribe({
        next: () => {
          alert('Student successfully deleted.');
          this.router.navigate(['/students']); // Redirect to the student list
        },
        error: (err) => {
          console.error('Failed to delete student', err);
          this.errorMessage = 'Failed to delete the student. Please try again later.';
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/students']); // Navigate back to the student list
  }
}


