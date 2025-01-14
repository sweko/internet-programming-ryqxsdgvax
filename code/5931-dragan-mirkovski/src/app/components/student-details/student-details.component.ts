import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student';
import { ApiService } from '../../services/student.service';


@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student!: Student;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const studentId = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getStudents().subscribe((data) => {
      this.student = data;
    });
  }
}
