import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Course, Degree, Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { DegreeService } from '../../services/degree.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-student-create',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent {
  studentForm: FormGroup | undefined;
  degrees: Degree[] = [];
  courses: Course[] = [];

  constructor(
    private studentService: StudentService,
    private degreeService: DegreeService,
    private courseService: CourseService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      studentId: ['', [Validators.required, Validators.pattern('^\\d{4}-\\d{4}$')]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      courses: ['']
    });
  }

  ngOnInit(): void {
    this.degreeService.getDegrees().subscribe(degrees => {
      this.degrees = degrees;
    });

    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    })
  }

  onSubmit(): void {
    if (this.studentForm?.invalid) {
      return;
    }

    const newStudent: Student = this.studentForm?.value;
    this.studentService.createStudent(newStudent).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}
