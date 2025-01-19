import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  studentId: number | null = null; // Initialize as null

  constructor(
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(this.studentId).subscribe(data => {
      this.studentForm.patchValue(data);
      // Populate courses if needed
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.studentService.updateStudent(this.studentId!, this.studentForm.value).subscribe(() => {
        this.router.navigate(['/students', this.studentId]);
      });
    }
  }
}