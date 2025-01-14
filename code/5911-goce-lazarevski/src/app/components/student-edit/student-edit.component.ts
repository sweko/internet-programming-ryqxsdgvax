import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { map, Subscription, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-edit.component.html',
  styleUrl: './student-edit.component.css'
})
export class StudentEditComponent implements OnInit, OnDestroy {
  student: Student | undefined;
  studentId: number | undefined;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => {
        const id = Number(params['id']);
        if (isNaN(id)) {
          throw new Error('Invalid student ID');
        }
        this.studentId = id;
        return id;
      }),
      switchMap(studentId => this.studentService.getStudentById(studentId))
    ).subscribe({
      next: student => {
        this.student = student;
      },
      error: err => {
        console.error('Error fetching student:', err);
        this.router.navigate(['/students']);
      }
    });
  }

  saveStudent(): void {
    if (this.studentId && this.student) {
      this.studentService.updateStudent(this.studentId, this.student).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: err => {
          console.error('Error updating student:', err);
        }
      });
    } else {
      console.error('Student or student ID is undefined');
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
