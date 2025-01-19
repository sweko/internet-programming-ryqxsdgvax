import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      degree: ['', Validators.required],
      year: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
    });
  }

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    if (this.studentId) {
      this.studentService.getStudentById(this.studentId).subscribe((student) => {
        this.studentForm.patchValue(student);
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid && this.studentId) {
      this.studentService.updateStudent(this.studentId, this.studentForm.value).subscribe(() => {
        this.router.navigate(['/students', this.studentId]);
      });
    }
  }
}
