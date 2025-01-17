import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DegreeService } from '../../services/degree.service';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-create.component.html',
  styleUrl: './student-create.component.css'
})
export class StudentCreateComponent implements OnInit {

  studentForm: FormGroup = {} as unknown as FormGroup;
  degrees: string[] = [];
  yearOneCourses: Course[] = [];


  constructor(
    private fb: FormBuilder,
    private degreeService: DegreeService,
    private studentService: StudentService,
    private coursesService: CoursesService
  ){
    this.studentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }



  onSubmit(){
    this.studentService.createStudent(this.studentForm.value).subscribe({
    next: (response) => {

     console.log("Student created successfully!  Response: ", response);
     this.studentForm.reset();
    },
    error: (error) => {
      console.error("Error creating student: ", error);
     }
    })
    console.log(this.studentForm.value);
  }


  // getFirstYearCourses(){
  //   this.coursesService.getCourses().s
  //   });
  // }

  getFirstYearCourses(){
    this.coursesService.getCourses().subscribe((courses) => {
     this.yearOneCourses = courses.filter((course) => course.yearOfStudy === 1);
    });
  }

  getDegrees(){
    this.degreeService.getDegrees().subscribe((degrees) => {
      this.degrees = degrees.map((degree) => degree.name);
    });
  }

  ngOnInit(): void {
    this.getDegrees();
  }


}
