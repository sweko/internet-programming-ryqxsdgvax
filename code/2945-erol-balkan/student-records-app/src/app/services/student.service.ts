import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string;
    dateOfBirth: string;
    email: string;
    degree: string;
    year: number;
    courses: Array<{
        code: string;
        grade?: {
            percentage: number;
            letter: string;
        };
        semester: string;
    }>;
}

@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiUrl = 'https://localhost:3000/students';

    constructor(private http: HttpClient) { }

    getStudents(): Observable<Student[]> {
        return this.http.get<Student[]>(this.apiUrl);
    }

    getStudentById(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.apiUrl}/${id}`);
    }

    createStudent(student: Student): Observable<Student> {
        return this.http.post<Student>(this.apiUrl, student);
    }

    updateStudent(id: number, student: Student): Observable<Student> {
        return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
    }

    deleteStudent(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
