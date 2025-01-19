import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../students.service';
import { Student } from '../models/student';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationdialogComponent } from '../confirmationdialog/confirmationdialog.component';
import { Course } from '../models/course';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, ConfirmationdialogComponent],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: Student | null = null;
  courses: Course[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsService: StudentsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchStudent(Number(id));
      this.fetchCourses();
    }
  }

  fetchStudent(id: number): void {
    this.studentsService.getStudentById(id).subscribe((student) => {
      this.student = student;
    });
  }

  calculateAverageGrade(): string {
    if (!this.student) return 'N/A';
    const gradedCourses = this.student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) {
      return 'N/A';
    }
    const totalPercentage = gradedCourses.reduce((sum, course) => 
      sum + (course.grade?.percentage || 0), 0);
    const average = totalPercentage / gradedCourses.length;
    return average.toFixed(2);
  }

  calculateSuccessRate(): string {
    if (!this.student) return 'N/A';
    const passedCourses = this.student.courses.filter(course => course.grade && course.grade.percentage >= 50);
    const successRate = (passedCourses.length / this.student.courses.length) * 100;
    return `${successRate.toFixed(2)}%`;
  }

  editStudent(): void {
    if (this.student) {
      this.router.navigate([`/students/${this.student.id}/edit`]);
    }
  }

  deleteStudent(): void {
    if (this.student) {
      const dialogRef = this.dialog.open(ConfirmationdialogComponent, {
        width: '250px',
        data: { message: 'Are you sure you want to delete this student?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.studentsService.deleteStudent(this.student!.id).subscribe(() => {
            this.router.navigate(['/students']);
          });
        }
      });
    }
  }

  fetchCourses(): void {
    this.studentsService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  getCourseYear(courseCode: string): number {
    const course = this.courses.find(c => c.code === courseCode);
    return course ? course.yearOfStudy : 0;
  }

  backToList(): void {
    this.router.navigate(['/students']);
  }
}