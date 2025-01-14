import { Component, OnInit } from '@angular/core';
import { AppService } from '../app-service.service';
import { Student, Degree } from '../model/model';
import { Router, RouterLink } from '@angular/router'; // Ensure Router is imported
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
  imports:[CommonModule,FormsModule,RouterLink],
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  degrees: Degree[] = [];
  page: number = 1; // Start on the first page
  itemsPerPage: number = 10;
  totalStudents: number = 0;

  filterStudentIdName: string = '';
  filterDegree: string = '';
  filterYears: number[] = [];
  filterMinGrade: number | null = null;
  filterMaxGrade: number | null = null;
  sortOrder: boolean = true; // Default ascending order
  sortColumn: string = 'firstName'; // Default sort by first name

  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadDegrees();
  }

  loadStudents(): void {
    this.appService.getStudents().subscribe((data) => {
      this.students = data;
      this.totalStudents = this.students.length; // Get total count of students
      this.paginateStudents();
    });
  }

  loadDegrees(): void {
    this.appService.getDegrees().subscribe((data) => {
      this.degrees = data;
    });
  }

  paginateStudents(): void {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    const endIndex = this.page * this.itemsPerPage;
    this.students = this.students.slice(startIndex, endIndex);
  }

  toggleSort(column: string): void {
    this.sortOrder = this.sortColumn === column ? !this.sortOrder : true;
    this.sortColumn = column;
    this.sortStudents();
  }

  sortStudents(): void {
    this.students.sort((a, b) => {
      const valA = a[this.sortColumn as keyof Student];
      const valB = b[this.sortColumn as keyof Student];
  
      if (valA < valB) return this.sortOrder ? -1 : 1;
      if (valA > valB) return this.sortOrder ? 1 : -1;
      return 0;
    });
  }

  calculateAverageGrade(student: Student): string {
    const gradedCourses = student.courses.filter((course) => course.grade);
    if (gradedCourses.length === 0) return 'N/A';

    const averageGrade =
      gradedCourses.reduce((sum, course) => sum + course.grade!.percentage, 0) / 
      gradedCourses.length;
    return averageGrade.toFixed(2);
  }

  calculateLetterGrade(average: string): string {
    const grade = parseFloat(average);
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  }

  deleteStudent(studentId: number): void {
    const confirmation = window.confirm(
      'Are you sure you want to delete this student? This action cannot be undone.'
    );

    if (confirmation) {
      this.appService.deleteStudent(studentId).subscribe({
        next: () => {
          this.students = this.students.filter((student) => student.id !== studentId);
          alert('Student deleted successfully.');
        },
        error: (err) => {
          console.error('Error deleting student:', err);
          alert('An error occurred while trying to delete the student.');
        },
      });
    }
  }

  addStudent(): void {
    this.router.navigate(['/students/create']);
  }

  // Define the missing methods
  viewStudent(studentId: number): void {
    this.router.navigate([`/students/${studentId}`]); // Navigate to the student details page
  }

  editStudent(studentId: number): void {
    this.router.navigate([`/students/${studentId}/edit`]); // Navigate to the student edit page
  }
}
