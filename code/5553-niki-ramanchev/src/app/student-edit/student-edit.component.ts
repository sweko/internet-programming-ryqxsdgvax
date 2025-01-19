import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {
  student: any = null;
  degrees = ['CS', 'SE', 'IT', 'DS', 'CE']; 
  errorMessage = '';
  courseGrades: { [courseCode: string]: { percentage: number; letter: string } } = {};

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchStudent(studentId);
  }

  fetchStudent(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe({
      next: (data) => {
        this.student = { ...data };
        this.initializeCourseGrades();
      },
      error: () => {
        this.errorMessage = 'Failed to fetch student details. Please try again later.';
      },
    });
  }

  initializeCourseGrades(): void {
    this.student.courses.forEach((course: any) => {
      if (course.grade) {
        this.courseGrades[course.code] = { ...course.grade };
      }
    });
  }

  addGrade(courseCode: string): void {
    const grade = this.courseGrades[courseCode];
    if (grade && grade.percentage >= 0 && grade.percentage <= 100) {
      grade.letter = this.calculateLetterGrade(grade.percentage);
    } else {
      alert('Grade percentage must be between 0 and 100.');
    }
  }

  calculateLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  saveStudent(): void {
    
    this.student.courses = this.student.courses.map((course: any) => ({
      ...course,
      grade: this.courseGrades[course.code] || course.grade,
    }));

    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: () => this.router.navigate([`/students/${this.student.id}`]),
      error: () => {
        this.errorMessage = 'Failed to save the student. Please try again later.';
      },
    });
  }

  cancel(): void {
    this.router.navigate([`/students/${this.student.id}`]);
  }
}
