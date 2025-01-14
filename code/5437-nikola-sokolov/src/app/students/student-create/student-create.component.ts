import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css'],
})
export class StudentCreateComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private studentService: StudentService) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      year: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentService.createStudent(this.studentForm.value).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
}
