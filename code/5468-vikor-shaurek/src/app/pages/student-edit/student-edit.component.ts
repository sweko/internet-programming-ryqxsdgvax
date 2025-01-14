import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Student } from '../../models/student.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  studentForm!: FormGroup;
  student?: Student;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getStudent(id).subscribe((data: any) => {
      this.student = data;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      firstName: [this.student?.firstName, Validators.required],
      lastName: [this.student?.lastName, Validators.required],
      email: [this.student?.email, [Validators.required, Validators.email]],
      degree: [this.student?.degree, Validators.required],
      year: [this.student?.year, [Validators.required, Validators.min(1), Validators.max(4)]],
    });
  }

  onSave(): void {
    if (this.studentForm.valid && this.student) {
      const updatedStudent = { ...this.student, ...this.studentForm.value };
      this.apiService.updateStudent(this.student.id, updatedStudent).subscribe(() => {
        this.router.navigate(['/students', this.student!.id]);
      });
    }
  }
}
