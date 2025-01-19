import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // The base URL of your API server

  constructor(private http: HttpClient) {}

  // Fetch all students
  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  // Fetch a single student by ID
  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}`);
  }

  // Create a new student
  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, student);
  }

  // Update an existing student
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/${id}`, student);
  }

  // Delete a student by ID
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/${id}`);
  }

  // Fetch all degrees
  getDegrees(): Observable<any> {
    return this.http.get(`${this.baseUrl}/degrees`);
  }

  // Fetch all courses
  getCourses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses`);
  }
}
