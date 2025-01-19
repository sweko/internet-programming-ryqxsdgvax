import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    studentId: '',
    dateOfBirth: '',
    email: '',
    degree: '',
    year: 1,
    courses: []
  };
  averageGrade: number = 0;
  successRate: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.studentsService.getStudentById(id).subscribe((student) => {
        this.student = student;
        this.calculateStatistics(student);
      });
    }
  }

  private calculateStatistics(student: Student): void {
    const gradedCourses = student.courses.filter((course) => course.grade);
    const totalGrades = gradedCourses.reduce(
      (sum, course) => sum + (course.grade?.percentage || 0),
      0
    );

    this.averageGrade =
      gradedCourses.length > 0 ? totalGrades / gradedCourses.length : 0;

    const passedCourses = gradedCourses.filter(
      (course) => course.grade?.percentage && course.grade.percentage >= 60
    );

    this.successRate =
      student.courses.length > 0
        ? (passedCourses.length / student.courses.length) * 100
        : 0;
  }

  editStudent(): void {
    this.router.navigate(['/students', this.student.id, 'edit']);
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentsService.deleteStudent(this.student.id).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }

  backToList(): void {
    this.router.navigate(['/students']);
  }
}
