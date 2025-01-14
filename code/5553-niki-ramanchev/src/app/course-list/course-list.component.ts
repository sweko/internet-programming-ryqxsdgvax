import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../student.service';

interface Course {
  id: number;
  code: string;
  name: string;
  semester: string;
  year: number;
  grade?: {
    percentage: number;
    letter: string;
  };
}

@Component({
  selector: 'app-course-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  errorMessage = '';
  courseGrades: { [id: number]: { percentage: number; letter: string } } = {};

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.courses = this.extractCoursesFromStudents(students);
        this.initializeCourseGrades();
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch courses. Please try again later.';
        console.error(err);
      },
    });
  }

  extractCoursesFromStudents(students: any[]): Course[] {
    const courses: Course[] = [];
    students.forEach((student) => {
      student.courses.forEach((course: any) => {
        if (!courses.find((c) => c.code === course.code)) {
          courses.push({
            id: student.id, 
            code: course.code,
            name: course.name || course.code, 
            semester: course.semester,
            year: student.year,
            grade: course.grade,
          });
        }
      });
    });
    return courses;
  }

  initializeCourseGrades(): void {
    this.courses.forEach((course) => {
      if (!course.grade) {
        this.courseGrades[course.id] = { percentage: 0, letter: '' };
      }
    });
  }

  addGrade(courseId: number): void {
    const grade = this.courseGrades[courseId];
    if (grade.percentage >= 0 && grade.percentage <= 100) {
      grade.letter = this.calculateLetterGrade(grade.percentage);

      const course = this.courses.find((c) => c.id === courseId);
      if (course) {
        course.grade = { ...grade };
      }
    } else {
      alert('Grade percentage must be between 0 and 100.');
    }
  }

  calculateLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }
}
