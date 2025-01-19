import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent {
  studentForm: FormGroup;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', Validators.required],
      courses: this.fb.array([]) // Initialize with an empty array
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