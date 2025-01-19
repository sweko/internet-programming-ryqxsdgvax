import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../services.service';
import { Student } from '../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-student-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-student-edit.component.html',
  styleUrl: './student-student-edit.component.css'
})
export class StudentStudentEditComponent implements OnInit {
  student!: Student;

  constructor(
    private service: Service,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.getStudentById(+id).subscribe(student => {
        this.student = student;
      });
    }
  }

  onSubmit(): void {
    this.service.updateStudent(+this.student.id, this.student).subscribe(() => {
      this.router.navigate(['/students', this.student.id]);
    });
  }
  onCancel(): void {
    this.router.navigate(['/students', this.student.id]);
  }
}
