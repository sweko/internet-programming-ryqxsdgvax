import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Student } from '../../../models/student.interface';
import { Degree } from '../../../models/degree.interface';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  student?: Student;
  degrees: Degree[] = [];
  loading = true;
  error = false;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDegrees();
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadStudent(id);
    }
    this.studentForm.get('degree')?.valueChanges.subscribe(() => {
      this.studentForm.get('year')?.updateValueAndValidity();
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      degree: ['', [Validators.required]],
      year: ['', [
        Validators.required, 
        Validators.min(1), 
        Validators.max(4),
        this.yearValidator()
      ]]
    });
  }

  private yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const selectedDegree = this.degrees.find(d => d.code === this.studentForm?.get('degree')?.value);
      if (!selectedDegree) return null;
      
      return control.value > selectedDegree.yearsToComplete ? 
        { yearTooHigh: { max: selectedDegree.yearsToComplete } } : null;
    };
  }

  private loadStudent(id: number): void {
    this.apiService.getStudent(id).subscribe({
      next: (student) => {
        this.student = student;
        this.studentForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          degree: student.degree,
          year: student.year
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  private loadDegrees(): void {
    this.apiService.getDegrees().subscribe({
      next: (degrees) => this.degrees = degrees.filter(d => d.active),
      error: (error) => console.error('Error loading degrees:', error)
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid || !this.student) return;

    this.saving = true;
    const updatedStudent: Student = {
      ...this.student,
      ...this.studentForm.value
    };

    this.apiService.updateStudent(this.student.id, updatedStudent).subscribe({
      next: () => {
        this.router.navigate(['/students', this.student?.id]);
      },
      error: (error) => {
        console.error('Error updating student:', error);
        this.saving = false;
      }
    });
  }
} 