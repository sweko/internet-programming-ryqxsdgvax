// src/app/components/student-edit/student-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { StudentService } from '../../services/student.service';
import { Student } from '../../interfaces/student.interface';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, StudentFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Edit Student</h2>
      </div>
      
      @if (student) {
        <app-student-form [student]="student"></app-student-form>
      } @else {
        <div class="text-center py-8">
          <p>Loading student information...</p>
        </div>
      }
    </div>
  `
})
export class StudentEditComponent implements OnInit {
  student?: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.studentService.getStudent(id).subscribe({
        next: (student) => {
          this.student = student;
        },
        error: (error) => {
          console.error('Error loading student:', error);
          this.router.navigate(['/students']);
        }
      });
    }
  }
}