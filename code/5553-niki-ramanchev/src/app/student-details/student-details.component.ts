import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  imports: [CommonModule],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any;
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchStudentDetails(studentId);
  }

  fetchStudentDetails(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe({
      next: (data) => {
        this.student = {
          ...data,
          averageGrade: this.calculateAverageGrade(data.courses),
          successRate: this.calculateSuccessRate(data.courses),
        };
      },
      error: () => {
        this.errorMessage = 'Failed to fetch student details. Please try again later.';
      },
    });
  }

  calculateAverageGrade(courses: any[]): string {
    const gradedCourses = courses.filter((course) => course.grade);
    if (gradedCourses.length === 0) return 'N/A';

    const totalGrade = gradedCourses.reduce(
      (sum, course) => sum + course.grade.percentage,
      0
    );
    return (totalGrade / gradedCourses.length).toFixed(2);
  }

  calculateSuccessRate(courses: any[]): string {
    const passedCourses = courses.filter((course) => course.grade && course.grade.percentage >= 60);
    return `${((passedCourses.length / courses.length) * 100).toFixed(2)}%`;
  }

  editStudent(): void {
    this.router.navigate([`/students/${this.student.id}/edit`]);
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id).subscribe({
        next: () => this.router.navigate(['/students']),
        error: () => {
          this.errorMessage = 'Failed to delete the student. Please try again later.';
        },
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }
}
