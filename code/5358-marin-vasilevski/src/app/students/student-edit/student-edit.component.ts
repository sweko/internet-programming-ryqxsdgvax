import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId!: number;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      degree: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.params['id'];
    this.loadStudentDetails();
  }

  loadStudentDetails(): void {
    this.apiService.getStudentById(this.studentId).subscribe(
      (student) => {
        this.studentForm.patchValue(student);
      },
      (error) => {
        console.error('Error fetching student details:', error);
        alert('Failed to load student details.');
        this.router.navigate(['/students']);
      }
    );
  }

  saveChanges(): void {
    if (this.studentForm.valid) {
      this.apiService.updateStudent(this.studentId, this.studentForm.value).subscribe(
        () => {
          alert('Student updated successfully!');
          this.router.navigate(['/students', this.studentId]);
        },
        (error) => {
          console.error('Error updating student:', error);
          alert('Failed to update student. Please try again.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
