import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseUrl);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getFullName(student: Student, format: 'firstLast' | 'lastFirst' = 'firstLast'): string {
    if (format === 'lastFirst') {
      return `${student.lastName}, ${student.firstName}`;
    }
    return `${student.firstName} ${student.lastName}`;
  }
  calculateAverageGrade(student: Student): number {
    const gradedCourses = student.courses.filter(course => course.grade?.percentage);
    if (gradedCourses.length === 0) return 0;
    
    const total = gradedCourses.reduce((sum, course) => 
      sum + (course.grade?.percentage || 0), 0);
    return Number((total / gradedCourses.length).toFixed(2));
  }

  getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 77) return 'B+';
    if (percentage >= 73) return 'B';
    if (percentage >= 70) return 'B-';
    if (percentage >= 67) return 'C+';
    if (percentage >= 63) return 'C';
    if (percentage >= 60) return 'C-';
    if (percentage >= 57) return 'D+';
    if (percentage >= 53) return 'D';
    if (percentage >= 50) return 'D-';
    return 'F';
  }

  getAverageLetterGrade(student: Student): string {
    const averageGrade = this.calculateAverageGrade(student);
    return averageGrade ? this.getLetterGrade(averageGrade) : 'N/A';
  }
}