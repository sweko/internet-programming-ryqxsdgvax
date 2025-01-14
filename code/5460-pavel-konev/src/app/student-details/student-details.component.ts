import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  standalone: true,
  imports: [] // Add any necessary imports here
})
export class StudentDetailsComponent {
  student: any;
  errorMessage: string = '';

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

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
}