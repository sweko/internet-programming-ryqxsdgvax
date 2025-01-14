import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define interfaces for type safety
export interface Student {
  id: number;
  name: string;
  age: number;
  degreeId: number;
}

export interface Degree {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  title: string;
  credits: number;
}

// Injectable service for API communication
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Adjust the base URL as needed

  constructor(private http: HttpClient) {}

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    return throwError('An error occurred: ' + error.message);
  }

  // CRUD operations for Students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/students`).pipe(
      catchError(this.handleError)
    );
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/students/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.baseUrl}/students`, student).pipe(
      catchError(this.handleError)
    );
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/students/${student.id}`, student).pipe(
      catchError(this.handleError)
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/students/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // CRUD operations for Degrees
  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${this.baseUrl}/degrees`).pipe(
      catchError(this.handleError)
    );
  }

  getDegree(id: number): Observable<Degree> {
    return this.http.get<Degree>(`${this.baseUrl}/degrees/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addDegree(degree: Degree): Observable<Degree> {
    return this.http.post<Degree>(`${this.baseUrl}/degrees`, degree).pipe(
      catchError(this.handleError)
    );
  }

  updateDegree(degree: Degree): Observable<Degree> {
    return this.http.put<Degree>(`${this.baseUrl}/degrees/${degree.id}`, degree).pipe(
      catchError(this.handleError)
    );
  }

  deleteDegree(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/degrees/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // CRUD operations for Courses
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`).pipe(
      catchError(this.handleError)
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/courses/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/courses`, course).pipe(
      catchError(this.handleError)
    );
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/courses/${course.id}`, course).pipe(
      catchError(this.handleError)
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
