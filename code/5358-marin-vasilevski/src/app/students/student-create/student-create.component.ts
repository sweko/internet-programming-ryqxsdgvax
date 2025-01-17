import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
})
export class StudentCreateComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      degree: ['', Validators.required],
    });
  }

  createStudent(): void {
    if (this.studentForm.valid) {
      this.apiService.createStudent(this.studentForm.value).subscribe(
        () => {
          alert('Student created successfully!');
          this.router.navigate(['/students']);
        },
        (error) => {
          console.error('Error creating student:', error);
          alert('Failed to create student. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
