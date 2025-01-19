import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  standalone: true,
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  imports: [ReactiveFormsModule],
})
export class StudentDetailsComponent implements OnInit {
  student: any;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.fetchStudentDetails(Number(id)); // Ensure `id` is converted to a number
    }
  }

  fetchStudentDetails(id: number): void {
    this.apiService.getStudentById(id).subscribe(
      (data) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
        alert('Failed to load student details.');
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/students']);
  }

  editStudent(): void {
    this.router.navigate(['/students', this.student.id, 'edit']);
  }
}
