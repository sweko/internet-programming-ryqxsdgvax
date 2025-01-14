import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule here
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadStudent(this.studentId);
  }

  initForm(): void {
    this.studentForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      dateOfBirth: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
    });
  }

  loadStudent(id: number): void {
    this.studentService.getStudentById(id).subscribe({
      next: (data) => this.studentForm.patchValue(data),
      error: () => alert('Failed to load student details.'),
    });
  }

  updateStudent(): void {
    if (this.studentForm.valid) {
      this.studentService
        .updateStudent(this.studentId, this.studentForm.value)
        .subscribe({
          next: () => {
            alert('Student updated successfully!');
            this.router.navigate(['/students', this.studentId]);
          },
          error: () => alert('Failed to update student.'),
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/students', this.studentId]);
  }
}
