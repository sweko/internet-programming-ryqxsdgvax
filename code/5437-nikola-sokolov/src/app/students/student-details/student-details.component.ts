import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor and *ngIf
import { RouterModule } from '@angular/router'; // Import RouterModule for routerLink
import { StudentService } from '../../services/student.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule], // Correct usage of module imports
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getStudentById(+id).subscribe({
        next: (data) => {
          this.student = data;
        },
        error: (err) => {
          console.error('Error fetching student data:', err);
        },
      });
    }
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (err) => {
          console.error('Error deleting student:', err);
        },
      });
    }
  }
}
