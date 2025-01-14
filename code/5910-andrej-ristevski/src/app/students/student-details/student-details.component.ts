import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../src/app/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  student!: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent(studentId);
  }

  loadStudent(id: number): void {
    this.studentService.getStudentById(id).subscribe({
      next: (data) => (this.student = data),
      error: () => alert('Failed to load student details.'),
    });
  }

  backToList(): void {
    this.router.navigate(['/students']);
  }

  editStudent(): void {
    this.router.navigate(['/students', this.student.id, 'edit']);
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id).subscribe(() => {
        alert('Student deleted successfully.');
        this.backToList();
      });
    }
  }
}
