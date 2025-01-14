import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/students`);
  }

  // Fetch a single student by ID
  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/students/${id}`);
  }

  // Create a new student
  createStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/students`, student);
  }

  // Update an existing student
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/students/${id}`, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${id}`);
  }

  // Fetch all degrees
  getDegrees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/degrees`);
  }

  // Fetch all courses
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/courses`);
  }
}
