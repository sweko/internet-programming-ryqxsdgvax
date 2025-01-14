import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Student, Degree, Course } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  getStudent(id: number | string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`).pipe(
      tap(response => console.log('Fetched student:', response))
    );
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, student).pipe(
      tap(response => console.log('Created student:', response))
    );
  }

  updateStudent(id: number | string, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/students/${id}`, student).pipe(
      tap(response => console.log('Updated student:', response))
    );
  }

  deleteStudent(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${id}`);
  }

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${this.baseUrl}/degrees`);
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }
} 