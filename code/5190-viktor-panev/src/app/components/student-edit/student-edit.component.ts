import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: [1, [Validators.required, Validators.min(1), Validators.max(4)]]
    });
    this.studentId = 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = Number(id);
      this.apiService.getStudentById(this.studentId).subscribe(
        (student) => {
          this.studentForm.patchValue(student);
        },
        (error) => {
          console.error('Error fetching student details:', error);
        }
      );
    }
  }

  saveStudent(): void {
    if (this.studentForm.valid) {
      this.apiService.updateStudent(this.studentId, this.studentForm.value).subscribe(
        () => {
          this.router.navigate(['/students', this.studentId]);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
}