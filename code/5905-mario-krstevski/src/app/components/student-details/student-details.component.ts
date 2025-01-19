import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  student: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(id).subscribe(data => {
      this.student = data;
    });
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(this.student.id).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
}