import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService, Student } from '../../services/student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {
  student: Student | null = null;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudentDetails();
  }

  fetchStudentDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.getStudentById(id).subscribe(
      (data: Student) => {
        this.student = data;
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  saveStudent(): void {
    if (this.student) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe(
        () => {
          this.router.navigate(['/students', this.student.id]);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
}
