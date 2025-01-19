// src/app/pages/student-details/student-details.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../interfaces/student.interface';
import { CourseRecord } from '../../interfaces/course-record.interface';
import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (student) {
      <div class="container mx-auto p-4">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-bold">Student Details</h1>
          <div class="space-x-2">
            <button 
              [routerLink]="['/students', student.id, 'edit']"
              class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
            <button 
              (click)="deleteStudent()"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
            <button 
              routerLink="/students"
              class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Back to List
            </button>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4">
            <h2 class="text-xl font-semibold mb-4">Personal Information</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Student ID</p>
                <p class="font-medium">{{student.studentId}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Full Name</p>
                <p class="font-medium">{{studentService.getFullName(student, 'firstLast')}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Date of Birth</p>
                <p class="font-medium">{{student.dateOfBirth | date:'mediumDate'}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Email</p>
                <p class="font-medium">{{student.email}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Degree</p>
                <p class="font-medium">{{student.degree}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Year of Study</p>
                <p class="font-medium">Year {{student.year}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Academic Summary -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4">
            <h2 class="text-xl font-semibold mb-4">Academic Summary</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p class="text-sm text-gray-600">Average Grade</p>
                <p class="font-medium">
                  @if (studentService.calculateAverageGrade(student)) {
                    {{studentService.calculateAverageGrade(student)}}%
                  } @else {
                    N/A
                  }
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Total Courses</p>
                <p class="font-medium">{{student.courses.length}}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Graded Courses</p>
                <p class="font-medium">{{getGradedCoursesCount(student)}}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Course List -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4">
            <h2 class="text-xl font-semibold mb-4">Course List</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semester</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grade</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  @for (course of student.courses; track course.code) {
                    <tr>
                      <td class="px-6 py-4">{{course.code}}</td>
                      <td class="px-6 py-4">{{getCourseNameByCode(course.code)}}</td>
                      <td class="px-6 py-4 capitalize">{{course.semester}}</td>
                      <td class="px-6 py-4">
                        @if (course.grade) {
                          <span [class]="getGradeClass(course.grade.percentage)">
                            {{course.grade.percentage}}% ({{course.grade.letter}})
                          </span>
                        } @else {
                          <span class="text-gray-500">Not Graded</span>
                        }
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    }
  `
})
export class StudentDetailsComponent implements OnInit {
  student?: Student;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public studentService: StudentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.studentService.getStudent(id).subscribe({
        next: (student) => this.student = student,
        error: (error) => {
          console.error('Error loading student:', error);
          this.router.navigate(['/students']);
        }
      });
    }
  }

  getGradedCoursesCount(student: Student): number {
    return student.courses.filter(course => course.grade !== null && course.grade !== undefined).length;
  }

  getCourseNameByCode(code: string): string {
    return this.courseService.getCourseNameByCode(code) || code;
  }

  getGradeClass(percentage: number): string {
    if (percentage >= 90) return 'text-green-600 font-bold';
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 70) return 'text-yellow-500';
    if (percentage >= 60) return 'text-orange-500';
    return 'text-red-500';
  }

  deleteStudent(): void {
    if (!this.student) return;

    if (confirm(`Are you sure you want to delete ${this.studentService.getFullName(this.student, 'firstLast')}?`)) {
      this.studentService.deleteStudent(this.student.id).subscribe({
        next: () => this.router.navigate(['/students']),
        error: (error) => console.error('Error deleting student:', error)
      });
    }
  }
}