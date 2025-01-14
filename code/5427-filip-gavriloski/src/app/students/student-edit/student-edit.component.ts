import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  standalone: true, // Marking the component as standalone
  selector: 'app-student-edit',
  template: `
    <h1>Edit Student</h1>
    <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
      <label for="firstName">First Name:</label>
      <input id="firstName" formControlName="firstName" required />
      <div *ngIf="studentForm.get('firstName')?.invalid && studentForm.get('firstName')?.touched">
        First Name is required.
      </div>

      <label for="lastName">Last Name:</label>
      <input id="lastName" formControlName="lastName" required />
      <div *ngIf="studentForm.get('lastName')?.invalid && studentForm.get('lastName')?.touched">
        Last Name is required.
      </div>

      <label for="email">Email:</label>
      <input id="email" formControlName="email" required />
      <div *ngIf="studentForm.get('email')?.invalid && studentForm.get('email')?.touched">
        A valid Email is required.
      </div>

      <label for="degree">Degree:</label>
      <select id="degree" formControlName="degree" required>
        <option *ngFor="let degree of degrees" [value]="degree">{{ degree }}</option>
      </select>
      <div *ngIf="studentForm.get('degree')?.invalid && studentForm.get('degree')?.touched">
        Degree is required.
      </div>

      <label for="year">Year:</label>
      <input id="year" type="number" formControlName="year" required />
      <div *ngIf="studentForm.get('year')?.invalid && studentForm.get('year')?.touched">
        Year must be between 1 and 4.
      </div>

      <button type="submit" [disabled]="studentForm.invalid">Submit</button>
    </form>

    <h2>Assigned Courses</h2>
    <div *ngFor="let course of assignedCourses">
      <p>Course Name: {{ course.name }}</p>
      <p>Semester: {{ course.semester }}</p>
      <p>Grade: {{ course.grade || 'N/A' }}</p>
      <hr />
    </div>
  `,
  imports: [ReactiveFormsModule, CommonModule] // Ensure CommonModule is included
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  degrees = ['Bachelor', 'Master', 'PhD']; // Example degrees
  studentId!: string; // Variable to hold the student ID
  assignedCourses: any[] = []; // Array to hold assigned courses

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
    });

    // Fetch the student ID from the route
    this.studentId = this.route.snapshot.paramMap.get('id')!;
    
    // Call the API to fetch student data
    this.http.get(`/students/${this.studentId}`).subscribe((data: any) => {
      // Populate the form with the fetched data
      this.studentForm.patchValue(data);
      this.assignedCourses = data.courses || []; // Assuming courses are part of the student data
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
    }
  }
}