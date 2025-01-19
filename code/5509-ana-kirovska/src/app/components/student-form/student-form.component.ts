import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, Course, Grade, SemesterType } from '../../models/student.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core';
import { NgIf,NgForOf,NgFor } from '@angular/common';
import { DegreeService } from '../../services/degree.service';
import { Degree } from '../../models/degree.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-student-form',
  imports: [MatFormFieldModule, MatIconModule, NgIf, ReactiveFormsModule,MatOptionModule,NgForOf,MatInputModule,MatSelectModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent {
  studentForm!: FormGroup;
  isEditMode = false;
  studentId?: number;
  degrees: Degree[] = []; 

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private degreeService:DegreeService
  ) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth:['', [Validators.required]],
      degree: ['', Validators.required],
      year: ['', Validators.required],
    });

    this.degreeService.fetchDegrees().subscribe((degrees: Degree[]) => {
      this.degrees = degrees; // Store the fetched degrees
    });

    // Check if we are in edit mode
    this.route.params.subscribe((params) => {
      this.studentId = +params['id'];
      if (this.studentId) {
        this.isEditMode = true;
        this.loadStudentDetails(this.studentId);
      }
    });
  }

  loadStudentDetails(id: number): void {
    this.studentService.fetchSpecificStudent(id).subscribe((student) => {
      this.studentForm.patchValue({
        firstName: student.firstName,
        lastName: student.lastName,
        studentId: student.studentId,
        email: student.email,
        dateOfBirth: student.dateOfBirth,
        degree: student.degree,
        year: student.year,
      });
    });
  }


  submit(): void {
    if (this.studentForm.invalid) return;

    const studentData: Student = this.studentForm.value;

    if (this.isEditMode && this.studentId) {
      this.studentService.updateSpecificStudent(this.studentId, studentData).subscribe(() => {
        this.router.navigate(['/students']); // Redirect to list page after save
      });
    } else {
      this.studentService.createStudent(studentData).subscribe(() => {
        this.router.navigate(['/students']); // Redirect to list page after save
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/students']); // Redirect to items list
  }
}
