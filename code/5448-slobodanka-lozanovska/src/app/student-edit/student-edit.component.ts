// student-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from '../models/student';
import { Course } from '../models/course';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  studentForm: FormGroup;
  availableDegrees: string[] = ['BSc', 'MSc', 'PhD']; 
  availableCourses: Course[] = [];  
  studentId: number = 0;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      degree: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1), Validators.max(4)]],
      courses: this.fb.array([])
    });
  }

  ngOnInit() {
    this.studentService.getCourses().subscribe(courses => {
      this.availableCourses = courses; 
    });

    this.route.params.subscribe(params => {
      this.studentId = +params['id'];
      this.loadStudent(this.studentId);
    });
  }

  loadStudent(id: number) {
    this.studentService.getStudentById(id).subscribe(student => {
      if (student) {
        this.studentForm.patchValue({
          id: student.id,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          degree: student.degree,
          year: student.year
        });

        // const coursesFormArray = this.studentForm.get('courses') as FormArray;
        // student.courses.forEach(course => {
        //   coursesFormArray.push(this.createCourseFormGroup(course));
        // });
      }
    });
  }

  // createCourseFormGroup(course: Course) {
  //   return this.fb.group({
  //     id: [course.id, Validators.required],
  //     name: [course.name, Validators.required],
  //     code: [course.code, [Validators.required, Validators.pattern('[A-Z]{2,4}[0-9]{3}')]],
  //     semester: [course.semester, Validators.required],
  //     yearOfStudy: [course.yearOfStudy, [Validators.required, Validators.min(1), Validators.max(4)]],
  //     grade: [course.code || '', Validators.pattern('^[A-F]{1}$')]
  //   });
  // }

  get courseControls() {
    return (this.studentForm.get('courses') as FormArray).controls;
  }

  addGrade(courseIndex: number) {
    const courses = this.studentForm.get('courses') as FormArray;
    const selectedCourse = this.availableCourses[courseIndex];

    const courseFormGroup = courses.at(courseIndex) as FormGroup;
    if (courseFormGroup.get('grade')?.value) {
      return;
    }

    courseFormGroup.patchValue({
      grade: 'A'
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const studentData = {
        ...this.studentForm.getRawValue(),
        id: this.studentId
      };

      this.studentService.updateStudent(studentData).subscribe({
        next: () => {
          alert('Student updated successfully');
          this.router.navigate(['/students', this.studentId]);
        },
        error: (error) => {
          alert('Error updating student');
          console.error(error);
        }
      });
    } else {
      this.markFormGroupTouched(this.studentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
      if (control instanceof FormArray) {
        control.controls.forEach(c => {
          if (c instanceof FormGroup) {
            this.markFormGroupTouched(c);
          }
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/students', this.studentId]);
  }
}
