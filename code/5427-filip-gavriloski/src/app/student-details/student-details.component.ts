import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, Student } from '../api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StudentDetailsComponent implements OnInit {
  student: Student | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.apiService.getStudent(id).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student data', error);
      }
    );
  }

  editStudent(): void {
    this.router.navigate(['/student-edit', this.student?.id]);
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.apiService.deleteStudent(this.student!.id).subscribe(
        () => {
          alert('Student deleted successfully');
          this.router.navigate(['/students-list']);
        },
        (error) => {
          console.error('Error deleting student', error);
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/students-list']);
  }
}
