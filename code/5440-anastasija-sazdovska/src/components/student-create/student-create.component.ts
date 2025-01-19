import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], 
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
  }

  createStudent(): void {
    if (this.studentForm.invalid) {
      return;
    }

    const newStudent = this.studentForm.value;
    this.apiService.createStudent(newStudent).subscribe({
      next: () => {
        alert('Student created successfully!');
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error creating student:', error);
      }
    });
  }
}
