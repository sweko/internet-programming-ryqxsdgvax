import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { Student } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css'],
  imports: [CommonModule, FormsModule] 
})
export class StudentDetailsComponent implements OnInit {
  student: Student | null = null;

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = +this.route.snapshot.paramMap.get('id')!;  
    this.loadStudentDetails(studentId);
  }

  // Fetch student details by ID
  loadStudentDetails(id: number): void {
    this.appService.getStudent(id).subscribe((data) => {
      this.student = data;
    });
  }

  // Calculate the average grade of the student
  calculateAverageGrade(): string {
    if (!this.student) return 'N/A';

    const gradedCourses = this.student.courses.filter((course) => course.grade);
    if (gradedCourses.length === 0) return 'N/A';

    const averageGrade =
      gradedCourses.reduce((sum, course) => sum + course.grade!.percentage, 0) /
      gradedCourses.length;
    return averageGrade.toFixed(2);
  }

  // Calculate the success rate (percentage of passed courses)
  successRate(): string {
    if (!this.student) return 'N/A';

    const passedCourses = this.student.courses.filter(
      (course) => course.grade && course.grade.letter !== 'F'
    ).length;
    const totalCourses = this.student.courses.length;
    const successRate = (passedCourses / totalCourses) * 100;
    return totalCourses > 0 ? `${successRate.toFixed(2)}%` : 'N/A';
  }

  // Delete the student after confirmation
  deleteStudent(): void {
    const confirmation = window.confirm(
      'Are you sure you want to delete this student? This action cannot be undone.'
    );
    if (confirmation && this.student) {
      this.appService.deleteStudent(this.student.id).subscribe(() => {
        alert('Student deleted successfully.');
        this.router.navigate(['/students']);
      });
    }
  }

  // Navigate to the edit page for the student
  editStudent(): void {
    if (this.student) {
      this.router.navigate([`/students/${this.student.id}/edit`]);
    }
  }

  // Go back to the student list page
  goBack(): void {
    this.router.navigate(['/students']);
  }
}
