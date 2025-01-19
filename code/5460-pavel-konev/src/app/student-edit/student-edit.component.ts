import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  standalone: true,
  imports: [FormsModule] // Ensure FormsModule is imported
})
export class StudentEditComponent {
  student: any;
  errorMessage: string = '';

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(id).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (error) => {
        this.errorMessage = 'Error fetching student details: ' + error.message;
      }
    });
  }

  saveStudent(): void {
    const id = this.student.id;
    this.studentService.updateStudent(id, this.student).subscribe({
      next: () => {
        this.router.navigate(['/students']);
      },
      error: (error) => {
        this.errorMessage = 'Error updating student: ' + error.message;
      }
    });
  }
}
