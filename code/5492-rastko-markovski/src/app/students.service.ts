import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './models/student.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents() {
    const url = `${BASE_URL}/students`;
    return this.http.get<Student[]>(url);
  }

  getStudentById(id: number) {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.get<Student>(url);
  }

  createStudent(student: Student) {
    const url = `${BASE_URL}/students`;
    return this.http.post<Student>(url, student);
  }

  updateStudent(id: number, student: Student) {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.put<Student>(url, student);
  }

  deleteStudent(id: number) {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.delete<void>(url);
  }
}
