import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getStudentById(+id).subscribe((data: any) => {
        this.student = data;
      });
    }
  }

  calculateAverageGrade() {
    if (!this.student?.courses) return 'N/A';

    const grades = this.student.courses
      .filter((course: any) => course.grade?.percentage)
      .map((course: any) => course.grade.percentage);

    if (grades.length === 0) return 'N/A';

    const total = grades.reduce((sum: number, grade: number) => sum + grade, 0);
    return (total / grades.length).toFixed(2);
  }

  calculateSuccessRate() {
    if (!this.student?.courses) return 0;

    const passed = this.student.courses.filter(
      (course: any) => course.grade?.percentage >= 60
    ).length;
    const total = this.student.courses.length;

    return ((passed / total) * 100).toFixed(2);
  }

  goBack() {
    this.router.navigate(['/students']);
  }

  editStudent() {
    this.router.navigate([`/students/${this.student.id}/edit`]);
  }

  deleteStudent() {
    this.api.deleteStudent(this.student.id).subscribe(() => {
      this.router.navigate(['/students']);
    });
  }
}

