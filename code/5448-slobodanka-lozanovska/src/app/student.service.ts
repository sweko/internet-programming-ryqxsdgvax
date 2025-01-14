import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './models/student';
import { Observable } from 'rxjs';
import { Course } from './models/course';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    const url = `${BASE_URL}/students`;
    return this.http.get<Student[]>(url);
  }

  getStudentById(id: number): Observable<Student> {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.get<Student>(url);
  }

  deleteStudent(id: number): Observable<void> {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.delete<void>(url);
  }

  updateStudent(student: Student): Observable<Student> {
    const url = `${BASE_URL}/students/${student.id}`;
    return this.http.put<Student>(url, student);
  }

  createStudent(student: Student): Observable<Student> {
    const url = `${BASE_URL}/students`;
    return this.http.post<Student>(url, student);
  }

  getDegrees(): Observable<string[]> {
    const url = `${BASE_URL}/degrees`;
    return this.http.get<string[]>(url);
  }

  getCourses(): Observable<Course[]> {
    const url = `${BASE_URL}/courses`;
    return this.http.get<Course[]>(url);
}
}
