import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../models/grade';
import { StudentsService } from '../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-student-edit',
  standalone: false,
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit{
  student: Student | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.getStudentDetails();
    this.getStudents();
  }
  getStudentDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.studentService.getStudentById(+id).subscribe((student) => {
        this.student = student;
      });
    }
  }
  getStudents(): void {
    this.studentService.getStudents().subscribe((students) => {
      this.student = this.student;
    });
  }
  saveChanges(): void {
    if (this.student) {
      this.studentService.updateStudent(this.student).subscribe(() => {
        this.router.navigate(['/students', this.student!.id]);
      });
    }
 }
}
