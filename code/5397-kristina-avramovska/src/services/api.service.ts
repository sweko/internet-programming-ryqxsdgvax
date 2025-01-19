import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`);
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}`);
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, student);
  }

  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/students/${id}`);
  }
}
