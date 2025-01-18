import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as studentsData from '../../template/db/students.json';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    // Return the students data from the JSON file
    return of((studentsData as any).students);
  }

  getStudentById(id: number): Observable<Student> {
    const student = (studentsData as any).students.find((s: Student) => s.id === id);
    return of(student);
  }

  createStudent(student: Student): Observable<Student> {
    // Implementation for creating a student
    return of(student); // Placeholder
  }

  updateStudent(id: number, student: Student): Observable<Student> {
    // Implementation for updating a student
    return of(student); // Placeholder
  }

  deleteStudent(id: number): Observable<void> {
    // Implementation for deleting a student
    return of(); // Placeholder
  }
}
