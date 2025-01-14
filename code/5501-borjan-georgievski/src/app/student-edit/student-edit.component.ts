import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app-service.service';
import { Student, Degree, Course } from '../model/model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class StudentEditComponent implements OnInit {
  student: Student | null = null;
  degrees: Degree[] = [];
  selectedDegree: Degree | null = null;
  availableYears: number[] = [];

  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    if (studentId) {
      this.loadStudentDetails(studentId);
      this.loadDegrees();
    }
  }

  loadStudentDetails(id: number): void {
    this.appService.getStudent(id).subscribe((data) => {
      this.student = data;
      if (this.student && this.degrees.length > 0) {
        this.selectedDegree = this.degrees.find(degree => degree.code === this.student?.degree) || null;
        this.setAvailableYears();
      }
    });
  }

  loadDegrees(): void {
    this.appService.getDegrees().subscribe((data) => {
      this.degrees = data.filter(degree => degree.active);
      if (this.student) {
        this.selectedDegree = this.degrees.find(degree => degree.code === this.student?.degree) || null;
        this.setAvailableYears();
      }
    });
  }

  setAvailableYears(): void {
    if (this.selectedDegree) {
      this.availableYears = Array.from(
        { length: this.selectedDegree.yearsToComplete },
        (_, i) => i + 1
      );
    }
  }

  saveStudent(form: NgForm): void {
    if (form.invalid || !this.student) return;

    // Update the student's degree code from the selected degree
    if (this.selectedDegree) {
      this.student.degree = this.selectedDegree.code;
    }

    this.appService.updateStudent(this.student.id, this.student).subscribe(() => {
      this.router.navigate(['/students', this.student!.id]);
    });
  }
}