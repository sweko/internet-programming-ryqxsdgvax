import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/student.service';
import { Student } from '../../models/student';


@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  student: Student | undefined;
  studentForm!: FormGroup;
  studentId!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getStudents().subscribe((student) => {
      this.initializeForm(student);
    });
  }

  initializeForm(student: Student): void {
    this.studentForm = this.fb.group({
      firstName: [student.firstName, Validators.required],
      lastName: [student.lastName, Validators.required],
      email: [student.email, [Validators.required, Validators.email]],
      degree: [student.degree, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedStudent: Student = {
        ...this.studentForm.value,
        id: this.studentId,
      };
      this.apiService.updateStudent(this.studentId, updatedStudent).subscribe(() => {
        this.router.navigate(['/students', this.studentId]);
      });
    }
  }
}

