import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class StudentDetailsComponent implements OnInit {
  student: Student | null = null;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.studentService.getStudentById(+id).subscribe((data) => (this.student = data));
  }
}
