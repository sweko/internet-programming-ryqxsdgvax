import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-details',
  imports: [RouterLink  ],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css'
})
export class StudentDetailsComponent implements OnInit {

  student: Student = {} as Student;

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router){}


  getStudentDetails(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!);
    console.log(`Student ID: ${id}`);
    this.studentService.getStudentById(id).subscribe(student => this.student = student);
  }

  calculateAverageGrade(student: Student): number {
    const gradedCourses = student.courses?.filter(course => course.grade);
    if (!gradedCourses || gradedCourses.length === 0) return 0;
    const sum = gradedCourses.reduce((acc, course) => acc + (course.grade?.percentage || 0), 0);
    return Number((sum / gradedCourses.length).toFixed(2));
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(
        () => {
          this.student = {} as Student;
          console.log('Student deleted successfully');
          this.router.navigate(['/students']);
        },
        error => console.error('Error deleting student:', error)
      );
    }
  }

  getNumberOfCourses(student: Student): number {
    return student.courses?.length || 0;
  }

  getNumberOfCoursesWithGrade(student: Student): number {
    return student.courses?.filter(course => course.grade).length || 0;
  }
  ngOnInit() {
    this.getStudentDetails();
  }
}
