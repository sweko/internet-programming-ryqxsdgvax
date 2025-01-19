import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from "../src/app/models/student.model";

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`);
  }

  createStudent(data: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, data);
  }

  updateStudent(id: number, data: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/students/${id}`, data);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${id}`);
  }
}
