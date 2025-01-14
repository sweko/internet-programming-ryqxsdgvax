import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, Degree, Course } from './model/model';

const BASE_URL = 'http://localhost:3000/';  

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

 
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${BASE_URL}students`);
  }
  
  
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${BASE_URL}students/${id}`);
  }

 
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${BASE_URL}students/${id}`);
  }


  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${BASE_URL}students`, student);
  }

  
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${BASE_URL}students/${id}`, student);
  }

 
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}students/${id}`);
  }


  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${BASE_URL}degrees`);
  }

 
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${BASE_URL}courses`);
  }
}
