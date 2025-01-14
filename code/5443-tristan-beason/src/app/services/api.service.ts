import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.interface';
import { Degree } from '../models/degree.interface';
import { Course } from '../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Student endpoints
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.API_URL}/students`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL}/students/${id}`);
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(`${this.API_URL}/students`, student);
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.API_URL}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/students/${id}`);
  }

  // Degree endpoints
  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${this.API_URL}/degrees`);
  }

  // Course endpoints
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.API_URL}/courses`);
  }
} 