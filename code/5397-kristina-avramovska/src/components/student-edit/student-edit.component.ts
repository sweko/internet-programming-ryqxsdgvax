import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule], 
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.studentForm = this.fb.group({
      id: [null], 
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]]
    });
    this.studentId = 0;
  }

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadStudent();
  }

  loadStudent(): void {
    this.apiService.getStudentById(this.studentId).subscribe({
      next: (data: any) => {
        this.studentForm.patchValue(data);
      },
      error: (error) => console.error('Error loading student:', error)
    });
  }

  saveStudent(): void {
    if (this.studentForm.invalid) {
      return;
    }

    const updatedStudent = this.studentForm.value; 
    this.apiService.updateStudent(this.studentId, updatedStudent).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.router.navigate(['/students']);
      },
      error: (error) => {
        console.error('Error updating student:', error);
      }
    });
  }
}
