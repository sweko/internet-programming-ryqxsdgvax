import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Degree, Student} from '../../models/student';
import {map, Observable, switchMap} from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  getStudents() {
    const url = `${BASE_URL}/students`;
    return this.http.get<Student[]>(url);
  }

  getStudentById(id: number) {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.get<Student>(url);
  }
  // getNationalities() {
  //   const url = `${BASE_URL}/nationalities`;
  //   return this.http.get<string[]>(url);
  // }
  getDegrees() {
    const url = `${BASE_URL}/degrees`;
    return this.http.get<Degree[]>(url);
  }
  updateStudent(id: number, student: Student) {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.put<Student>(url, student);
  }

  getLastStudentId(): Observable<number> {
    return this.http.get<Student[]>(`${BASE_URL}/students`).pipe(
      map(students => {
        if (students.length === 0) return 0;
        return Math.max(...students.map(student => student.id));
      })
    );
  }

  createStudent(studentData: any): Observable<Student> {
    return this.getLastStudentId().pipe(
      map(lastId => ({
        ...studentData,
        id: (lastId + 1).toString()
      })),
      switchMap(newStudentData =>
        this.http.post<Student>(`${BASE_URL}/students`, newStudentData)
      )
    );
  }
  deleteStudent(id: number) {
    const url = `${BASE_URL}/students/${id}`;
    return this.http.delete<Student>(url);
  }
}
