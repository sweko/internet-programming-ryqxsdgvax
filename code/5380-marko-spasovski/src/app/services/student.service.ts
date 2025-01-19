import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = "http://localhost:3000/students";

  constructor(private httpClient: HttpClient) {}


  getStudents(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student>{
    return this.httpClient.get<Student>(`${this.apiUrl}/${id}`);
  }

  deleteStudent(id: number): Observable<{}>{
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

  updateStudent(student: Student): Observable<Student>{
    return this.httpClient.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  createStudent(student: Student): Observable<Student>{
    return this.httpClient.post<Student>(this.apiUrl, student);
  }

}
