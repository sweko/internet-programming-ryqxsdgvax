import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/grade';
import { Observable} from 'rxjs';
const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

    apiUrl: any;
    student: Student[] = [];

    constructor(private http: HttpClient) { }

    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(`${BASE_URL}/students`);
    }

    updateStudent(student: Student): Observable<Student> {
        return this.http.put<Student>(`${BASE_URL}/students/${student.id}`, student);
    }

    deleteStudent(studentId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/students/${studentId}`);
    }

    addStudent(newStudent: Student): Observable<Student> {
        const { id, ...studentWithoutId } = newStudent;
        return this.http.post<Student>(`${BASE_URL}/students`, studentWithoutId);
    }

    getStudentById(studentId: number): Observable<Student> {
        return this.http.get<Student>(`${BASE_URL}/students/${studentId}`);
    }
}
