import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Student } from '../../../models/student.interface';
import { ApiService } from '../../../services/api.service';
import { StateService } from '../../../services/state.service';
import { NavigationService } from '../../../services/navigation.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isEditMode = false;
  studentId?: number;
  degrees: string[] = [];
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiService,
    private state: StateService,
    private navigation: NavigationService
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loadDegrees();
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isEditMode = true;
      this.studentId = id;
      this.loadStudent(id);
    } else {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z\s-]+$/)
      ]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      studentId: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{4}$/),
        this.validateStudentId()
      ]],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(4)
      ]]
    });
  }

  private validateStudentId(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;
      
      if (!/^2025-\d{4}$/.test(value)) {
        return { invalidFormat: true };
      }
      
      const numbers = value.split('-')[1];
      if (numbers === '0000') {
        return { invalidNumber: true };
      }
      
      return null;
    };
  }

  private loadDegrees(): void {
    this.api.getDegrees().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (degrees) => {
        this.degrees = degrees.map(d => d.code);
        this.state.setDegrees(degrees);
      },
      error: (error) => {
        console.error('Error loading degrees:', error);
        this.error = 'Failed to load degrees';
      }
    });
  }

  private loadStudent(id: number): void {
    this.state.setLoading(true);
    this.api.getStudent(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (student) => {
        this.form.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          studentId: student.studentId,
          dateOfBirth: student.dateOfBirth.split('T')[0],
          email: student.email,
          degree: student.degree,
          year: student.year
        });
        this.loading = false;
        this.state.setLoading(false);
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.error = 'Failed to load student';
        this.loading = false;
        this.state.setLoading(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    const studentData = {
      ...this.form.value,
      courses: this.isEditMode ? undefined : []
    };

    this.state.setLoading(true);
    const request = this.isEditMode
      ? this.api.updateStudent(this.studentId!, studentData)
      : this.api.createStudent(studentData);

    request.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (student) => {
        if (this.isEditMode) {
          this.state.updateStudent(student.id, student);
        } else {
          this.state.addStudent(student);
        }
        this.navigation.goToStudentDetail(student.id);
      },
      error: (error) => {
        console.error('Error saving student:', error);
        this.error = `Failed to ${this.isEditMode ? 'update' : 'create'} student`;
        this.state.setLoading(false);
      }
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control?.errors || !control.touched) return '';

    const errors = control.errors;
    
    if (controlName === 'studentId') {
      if (errors['required']) return 'Student ID is required';
      if (errors['pattern'] || errors['invalidFormat']) 
        return 'Student ID must be in format: 2025-XXXX (where X is any digit)';
      if (errors['invalidNumber'])
        return 'Invalid student number sequence';
    }
    
    if (errors['required']) return `${controlName} is required`;
    if (errors['email']) return 'Invalid email address';
    if (errors['minlength']) return `${controlName} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['min']) return `${controlName} must be at least ${errors['min'].min}`;
    if (errors['max']) return `${controlName} must be at most ${errors['max'].max}`;
    
    return 'Invalid value';
  }

  cancel(): void {
    this.navigation.goBack();
  }
} 