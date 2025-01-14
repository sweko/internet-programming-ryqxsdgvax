import { Component, OnInit } from '@angular/core';
import { StudentService, Student } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: Student[]) => {
        this.students = data;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  calculateAverageGrade(student: Student): string {
    const gradedCourses = student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return 'N/A';
    
    const total = gradedCourses.reduce((sum, course) => sum + course.grade!.percentage, 0);
    const average = total / gradedCourses.length;
    return average.toFixed(2);
  }

  viewStudent(id: number): void {
    this.router.navigate(['/students', id]);
  }

  editStudent(id: number): void {
    this.router.navigate(['/students', id, 'edit']);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.fetchStudents(); // Refresh the list after deletion
      });
    }
  }
}
