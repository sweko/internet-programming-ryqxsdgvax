import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private API_URL = 'https://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.API_URL);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.API_URL}/${id}`);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
