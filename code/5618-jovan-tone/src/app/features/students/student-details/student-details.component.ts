import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { StudentUtilsService } from '../services/student-utils.service';
import { Student } from '../../../models/student.interface';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student?: Student;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public studentUtils: StudentUtilsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStudent(id);
  }

  private loadStudent(id: number): void {
    this.apiService.getStudent(id).subscribe({
      next: (student) => {
        this.student = student;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading student:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  onDelete(): void {
    if (!this.student) return;

    if (confirm(`Are you sure you want to delete ${this.studentUtils.getFullName(this.student)}?`)) {
      this.apiService.deleteStudent(this.student.id).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (error) => console.error('Error deleting student:', error)
      });
    }
  }
} 