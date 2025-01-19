import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  degree: string;
  year: number;
}

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.studentForm = this.fb.group({
      id: [null],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required, Validators.minLength(2)]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
    this.studentId = 0;
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (!paramId) {
      this.handleError('Student ID is missing');
      return;
    }
    this.studentId = +paramId;
    this.loadStudent();
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    console.error(message);
  }

  loadStudent(): void {
    this.isLoading = true;
    this.apiService.getStudentById(this.studentId).subscribe({
      next: (data: Student) => {
        this.studentForm.patchValue(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(`Error loading student: ${error.message}`);
      }
    });
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      this.handleError('Please fill in all required fields correctly');
      return;
    }

    this.isLoading = true;
    const updatedStudent: Student = this.studentForm.value;

    this.apiService.updateStudent(this.studentId, updatedStudent).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/students']).then(() => {
          alert('Student updated successfully!');
        });
      },
      error: (error) => {
        this.isLoading = false;
        this.handleError(`Error updating student: ${error.message}`);
      }
    });
  }


  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}