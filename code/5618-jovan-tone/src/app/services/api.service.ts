import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.interface';
import { Degree } from '../models/degree.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }

  createStudent(student: Omit<Student, 'id'>): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/students`, student);
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/students/${id}`);
  }

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${this.apiUrl}/degrees`);
  }
} 