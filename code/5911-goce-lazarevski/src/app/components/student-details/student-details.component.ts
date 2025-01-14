import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Student } from '../../models/student';
import { StudentService } from '../../services/student.service';
import { map, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit, OnDestroy {
  student: Student | undefined;
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      map(params => Number(params['id'])),
      switchMap(studentId => this.studentService.getStudentById(studentId))
    ).subscribe(student => {
      this.student = student;
    })
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
