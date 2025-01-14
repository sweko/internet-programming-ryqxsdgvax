import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl='https://localhost:3000/students'

  constructor(private http:HttpClient) { }

  createStudent(studentRequest:Student):Observable<Student>{
    return this.http.post<Student>(this.apiUrl,studentRequest);
  }

  fetchStudents():Observable<Student[]>{
    return this.http.get<Student[]>(this.apiUrl);
  }

  fetchSpecificStudent(studentId:number):Observable<Student>{
    return this.http.get<Student>(`${this.apiUrl}/${studentId}`);
  }

  updateSpecificStudent(studentId:number, student:Student):Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${studentId}`,student);
  }

  deleteStudent(studentId:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
  }
}
