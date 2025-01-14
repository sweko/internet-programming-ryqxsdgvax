import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Service } from '../services.service';
import { Student } from '../models';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {
  student!: Student;

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private router: Router // Add this
  ) { }
  onDeleteStudent(student: Student): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.service.deleteStudent(student.id).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getStudentById(+id).subscribe(student => {
        this.student = student;
      });
    }
  }
}
