import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  imports: [CommonModule],
})
export class StudentDetailsComponent implements OnInit {
  student: any = null;
  averageGrade: number | 'N/A' = 'N/A';
  successRate: number | 'N/A' = 'N/A';

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId) {
      this.fetchStudentDetails(+studentId);
    }
  }

  fetchStudentDetails(id: number) {
    this.apiService.getStudentById(id).subscribe({
      next: (student) => {
        this.student = student;
        this.calculateMetrics();
      },
      error: (err) => {
        console.error('Error fetching student details:', err);
        this.router.navigate(['/students']);
      },
    });
  }

  calculateMetrics() {
    if (this.student && this.student.courses.length > 0) {
      const gradedCourses = this.student.courses.filter(
        (course: any) => course.grade
      );
      const totalGrades = gradedCourses.reduce(
        (sum: number, course: any) => sum + course.grade.percentage,
        0
      );
      this.averageGrade =
        gradedCourses.length > 0
          ? parseFloat((totalGrades / gradedCourses.length).toFixed(2))
          : 'N/A';

      const passedCourses = gradedCourses.filter(
        (course: any) => course.grade.percentage >= 50
      ).length;
      this.successRate =
        this.student.courses.length > 0
          ? parseFloat(
              ((passedCourses / this.student.courses.length) * 100).toFixed(2)
            )
          : 'N/A';
    }
  }

  editStudent() {
    if (this.student) {
      this.router.navigate(['/students', this.student.id, 'edit']);
    }
  }

  deleteStudent() {
    if (
      this.student &&
      confirm('Are you sure you want to delete this student?')
    ) {
      this.apiService.deleteStudent(this.student.id).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }

  goBack() {
    this.router.navigate(['/students']);
  }
}
