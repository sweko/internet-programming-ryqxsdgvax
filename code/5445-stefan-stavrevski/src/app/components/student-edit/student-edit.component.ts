import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  degrees: any[] = [];
  student: any = null;
  studentId: number | null = null;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.fetchDegrees();
    if (this.studentId) {
      this.fetchStudent(this.studentId);
    }
    this.initializeForm();
  }

  initializeForm() {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      courses: [[]],
    });
  }

  fetchStudent(id: number) {
    this.apiService.getStudentById(id).subscribe({
      next: (student) => {
        this.student = student;
        this.studentForm.patchValue({
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          degree: student.degree,
          year: student.year,
          courses: student.courses,
        });
      },
      error: (err) => {
        console.error('Error fetching student:', err);
        this.router.navigate(['/students']);
      },
    });
  }

  fetchDegrees() {
    this.apiService.getDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }

  saveStudent() {
    if (this.studentForm.valid) {
      const updatedStudent = { ...this.student, ...this.studentForm.value };
      this.apiService.updateStudent(this.studentId!, updatedStudent).subscribe({
        next: () => {
          this.router.navigate(['/students', this.studentId]);
        },
        error: (err) => {
          console.error('Error saving student:', err);
        },
      });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  updateCourseGrade(event: Event, course: any): void {
    const input = event.target as HTMLInputElement;
    const percentage = +input?.value || 0;

    course.grade = {
      percentage,
      letter: this.getLetterGrade(percentage),
    };
  }
}
