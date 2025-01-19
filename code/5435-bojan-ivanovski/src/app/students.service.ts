import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './models/student';
import { Degree } from './models/degree';
import { Course } from './models/course';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${id}`);
  }

  // Degrees
  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${this.baseUrl}/degrees`);
  }

  // Courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }
}