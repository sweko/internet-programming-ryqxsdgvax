import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';
import { Degree } from '../models/degree';
import { Course } from '../models/course';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  student: Student | null = null;
  degrees: Degree[] = [];
  courses: Course[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService
  ) {
    this.studentForm = this.fb.group({
      studentId: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchDegrees();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchStudent(Number(id));
    }
  }

  fetchStudent(id: number): void {
    this.studentsService.getStudentById(id).subscribe(student => {
      this.student = student;
      this.studentForm.patchValue({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        degree: student.degree,
        year: student.year
      });
    });
  }

  fetchDegrees(): void {
    this.studentsService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.studentForm.valid && this.student) {
      const updatedStudent: Student = {
        ...this.student,
        studentId: this.studentForm.get('studentId')?.value,
        firstName: this.studentForm.get('firstName')?.value,
        lastName: this.studentForm.get('lastName')?.value,
        email: this.studentForm.get('email')?.value,
        degree: this.studentForm.get('degree')?.value,
        year: this.studentForm.get('year')?.value,
        courses: this.student.courses // Preserve courses
      };

      this.studentsService.updateStudent(this.student.id, updatedStudent)
        .subscribe({
          next: () => {
            this.router.navigate(['/students', this.student!.id]);
          },
          error: (error) => {
            console.error('Error updating student:', error);
          }
        });
    }
  }

  updateCourseGrade(courseIndex: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const grade = parseFloat(inputElement.value);
    if (!isNaN(grade) && grade >= 0 && grade <= 100) {
      const letter = this.calculateLetterGrade(grade);
      this.student!.courses[courseIndex].grade = {
        percentage: grade,
        letter: letter
      };
    }
  }

  private calculateLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  cancel(): void {
    if (this.student) {
      this.router.navigate(['/students', this.student.id]);
    } else {
      this.router.navigate(['/students']);
    }
  }
}