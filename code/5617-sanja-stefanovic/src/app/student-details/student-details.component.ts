import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Ensure this is correct
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any; // Holds the student details
  studentId: number | null = null; // Initialize as null

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router // Ensure this is correct
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the student ID from the route
    this.studentId = id ? +id : null; // Convert to number or set to null
    this.loadStudentDetails();
  }

  loadStudentDetails(): void {
    if (this.studentId !== null) {
      this.studentService.getStudentById(this.studentId).subscribe(
        (data) => {
          this.student = data;
        },
        (error) => {
          console.error('Error fetching student details:', error);
        }
      );
    }
  }

  editStudent(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.router.navigate(['/students']); // Redirect to student list after deletion
        },
        (error) => {
          console.error('Error deleting student:', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/students']); // Navigate back to the student list
  }
}
