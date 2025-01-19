import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { Degree } from '../../models/degree.model';
import { DegreeService } from '../../services/degree.service';

@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup = {} as unknown as FormGroup;
  student: Student = {} as unknown as Student;
  degrees: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private degreeService: DegreeService
  ) { }


  ngOnInit(): void {
    this.getStudentDetails();
    this.getAvailableDegrees();
    this.initForm();
  }

  getAvailableDegrees(){
    this.degreeService.getDegrees().subscribe(degrees => {
      this.degrees = degrees.map(degrees => degrees.code);
      console.log(this.degrees)
    });
  }


  initForm(): void {
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
    });
  }

  populateForm(): void {
    this.studentForm.patchValue({
      firstName: this.student.firstName,
      lastName: this.student.lastName,
      email: this.student.email,
      degree: this.student.degree,
      year: this.student.year
    });
  }


  getStudentDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getStudentById(+id).subscribe(
        (student) => {
          this.student = student;
          this.populateForm();
        },
        (error) => console.error('Error fetching student:', error)
      );
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const updatedStudent = { ...this.student, ...this.studentForm.value };
      this.studentService.updateStudent(updatedStudent).subscribe(
        () => {
          this.router.navigate(['/students', this.student.id]);
        },
        (error) => console.error('Error updating student:', error)
      );
    }
  }


}
