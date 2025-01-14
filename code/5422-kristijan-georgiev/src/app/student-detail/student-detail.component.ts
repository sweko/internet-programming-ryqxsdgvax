import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../services/students.service';
import { Student } from '../models/grade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-detail',
  standalone: false,
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css'
})
export class StudentDetailComponent implements OnInit{
  student: Student | undefined
  constructor(private route: ActivatedRoute, private router: Router, private studentService: StudentsService) { }
  ngOnInit(): void {
    this.getStudentDetails();
  }
  getStudentDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.studentService.getStudentById(+id).subscribe((student: Student| undefined) => {
        this.student = student;
      });
    }
  }
  goToStudentList(): void {
    this.router.navigate(['/students']);
  }
}
