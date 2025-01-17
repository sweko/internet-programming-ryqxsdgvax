import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`);
  }

  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, student);
  }
}
