// src/app/components/student-form/student-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { DegreeService } from '../../services/degree.service';
import { CourseService } from '../../services/course.service';

import { Student } from '../../interfaces/student.interface';
import { Degree } from '../../interfaces/degree.interface';
import { Course } from '../../interfaces/course.interface';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <form [formGroup]="studentForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <!-- Personal Information Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            formControlName="firstName"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('firstName')"
          />
          @if (isFieldInvalid('firstName')) {
            <p class="text-red-500 text-sm mt-1">First name is required</p>
          }
        </div>

        <!-- Last Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            formControlName="lastName"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('lastName')"
          />
          @if (isFieldInvalid('lastName')) {
            <p class="text-red-500 text-sm mt-1">Last name is required</p>
          }
        </div>

        <!-- Student ID -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Student ID (YYYY-NNNN)</label>
          <input
            type="text"
            formControlName="studentId"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('studentId')"
            placeholder="2023-0001"
          />
          @if (isFieldInvalid('studentId')) {
            <p class="text-red-500 text-sm mt-1">Valid student ID is required (YYYY-NNNN)</p>
          }
        </div>

        <!-- Date of Birth -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            formControlName="dateOfBirth"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('dateOfBirth')"
          />
          @if (isFieldInvalid('dateOfBirth')) {
            <p class="text-red-500 text-sm mt-1">Date of birth is required</p>
          }
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            formControlName="email"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('email')"
          />
          @if (isFieldInvalid('email')) {
            <p class="text-red-500 text-sm mt-1">Valid email is required</p>
          }
        </div>

        <!-- Degree -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Degree</label>
          <select
            formControlName="degree"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('degree')"
            (change)="onDegreeChange()"
          >
            <option value="">Select Degree</option>
            @for (degree of degrees; track degree.code) {
              @if (degree.active) {
                <option [value]="degree.code">{{degree.name}}</option>
              }
            }
          </select>
          @if (isFieldInvalid('degree')) {
            <p class="text-red-500 text-sm mt-1">Degree is required</p>
          }
        </div>

        <!-- Year -->
        <div>
          <label class="block text-sm font-medium text-gray-700">Year</label>
          <select
            formControlName="year"
            class="mt-1 block w-full rounded-md border p-2"
            [class.border-red-500]="isFieldInvalid('year')"
            (change)="onYearChange()"
          >
            <option value="">Select Year</option>
            @for (year of availableYears; track year) {
              <option [value]="year">Year {{year}}</option>
            }
          </select>
          @if (isFieldInvalid('year')) {
            <p class="text-red-500 text-sm mt-1">Year is required</p>
          }
        </div>
      </div>

      <!-- Courses Section -->
      <div formArrayName="courses" class="mt-8">
        <h3 class="text-lg font-medium mb-4">Courses</h3>
        
        @for (course of coursesFormArray.controls; track $index) {
          <div [formGroupName]="$index" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded">
            <div>
              <label class="block text-sm font-medium text-gray-700">Course Code</label>
              <select
                formControlName="code"
                class="mt-1 block w-full rounded-md border p-2"
              >
                <option value="">Select Course</option>
                @for (course of getAvailableCourses(); track course.code) {
                  <option [value]="course.code">
                    {{course.code}} - {{course.name}}
                  </option>
                }
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Semester</label>
              <select
                formControlName="semester"
                class="mt-1 block w-full rounded-md border p-2"
              >
                <option value="autumn">Autumn</option>
                <option value="spring">Spring</option>
              </select>
            </div>

            <div formGroupName="grade">
              <label class="block text-sm font-medium text-gray-700">Grade (%)</label>
              <input
                type="number"
                formControlName="percentage"
                class="mt-1 block w-full rounded-md border p-2"
                min="0"
                max="100"
                (input)="updateLetterGrade($index)"
              />
            </div>

            <div class="flex items-end">
              <button 
                type="button"
                (click)="removeCourse($index)"
                class="text-red-600 hover:text-red-900">
                Remove
              </button>
            </div>
          </div>
        }

        <button 
          type="button"
          (click)="addCourse()"
          class="mt-4 text-blue-600 hover:text-blue-900">
          Add Course
        </button>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-between pt-6">
        <button
          type="button"
          routerLink="/students"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
          Cancel
        </button>
        <button
          type="submit"
          [disabled]="!studentForm.valid || studentForm.pristine"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
          {{student ? 'Update' : 'Create'}} Student
        </button>
      </div>
    </form>
  `
})
export class StudentFormComponent implements OnInit {
  @Input() student?: Student;
  
  studentForm: FormGroup;
  degrees: Degree[] = [];
  availableCourses: Course[] = [];
  availableYears: number[] = [1, 2, 3, 4];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService,
    private degreeService: DegreeService,
    private courseService: CourseService
  ) {
    this.studentForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadDegrees();
    this.loadCourses();
    if (this.student) {
      this.studentForm.patchValue(this.student);
      this.student.courses.forEach(course => this.addCourse(course));
      this.updateAvailableYears();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required]],
      courses: this.fb.array([])
    });
  }

  get coursesFormArray(): FormArray {
    return this.studentForm.get('courses') as FormArray;
  }

  loadDegrees(): void {
    this.degreeService.getDegrees().subscribe({
      next: (degrees) => {
        this.degrees = degrees;
        this.updateAvailableYears();
      },
      error: (error) => console.error('Error loading degrees:', error)
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => this.availableCourses = courses,
      error: (error) => console.error('Error loading courses:', error)
    });
  }

  addCourse(courseData?: any): void {
    const courseForm = this.fb.group({
      code: [courseData?.code || '', Validators.required],
      semester: [courseData?.semester || 'autumn', Validators.required],
      grade: this.fb.group({
        percentage: [courseData?.grade?.percentage || null],
        letter: [courseData?.grade?.letter || null]
      })
    });

    this.coursesFormArray.push(courseForm);
  }

  removeCourse(index: number): void {
    this.coursesFormArray.removeAt(index);
  }

  updateLetterGrade(index: number): void {
    const courseForm = this.coursesFormArray.at(index);
    const percentage = courseForm.get('grade.percentage')?.value;
    
    if (percentage !== null && percentage !== '') {
      const letter = this.getLetterGrade(percentage);
      courseForm.get('grade')?.patchValue({ letter }, { emitEvent: false });
    }
  }

  getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 77) return 'B+';
    if (percentage >= 73) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 67) return 'C+';
    if (percentage >= 63) return 'C';
    if (percentage >= 60) return 'C-';
    if (percentage >= 57) return 'D+';
    if (percentage >= 53) return 'D';
    if (percentage >= 50) return 'D-';
    return 'F';
  }

  onDegreeChange(): void {
    this.updateAvailableYears();
    this.studentForm.get('year')?.setValue('');
    this.coursesFormArray.clear();
  }

  onYearChange(): void {
    this.coursesFormArray.clear();
  }

  updateAvailableYears(): void {
    const degreeCode = this.studentForm.get('degree')?.value;
    const degree = this.degrees.find(d => d.code === degreeCode);
    if (degree) {
      this.availableYears = Array.from(
        { length: degree.yearsToComplete }, 
        (_, i) => i + 1
      );
    }
  }

  getAvailableCourses(): Course[] {
    const year = this.studentForm.get('year')?.value;
    if (!year) return [];
    return this.availableCourses.filter(course => course.yearOfStudy === year);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.studentForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const studentData = this.studentForm.value;
      
      // Update letter grades before submitting
      studentData.courses.forEach((course: any) => {
        if (course.grade?.percentage) {
          course.grade.letter = this.getLetterGrade(course.grade.percentage);
        }
      });

      const request = this.student
        ? this.studentService.updateStudent(this.student.id, studentData)
        : this.studentService.createStudent(studentData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error('Error saving student:', error);
        }
      });
    } else {
      Object.keys(this.studentForm.controls).forEach(key => {
        const control = this.studentForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}