import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.interface';
import { Degree } from '../models/degree.interface';
import { Course } from '../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private degreesSubject = new BehaviorSubject<Degree[]>([]);
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');

  // Public observables
  students$ = this.studentsSubject.asObservable();
  degrees$ = this.degreesSubject.asObservable();
  courses$ = this.coursesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  // State setters
  setStudents(students: Student[]): void {
    this.studentsSubject.next(students);
  }

  setDegrees(degrees: Degree[]): void {
    this.degreesSubject.next(degrees);
  }

  setCourses(courses: Course[]): void {
    this.coursesSubject.next(courses);
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  setError(error: string): void {
    this.errorSubject.next(error);
  }

  // Helper methods
  getStudentById(id: number): Observable<Student | undefined> {
    return this.students$.pipe(
      map(students => students.find(s => s.id === id))
    );
  }

  getDegreeByCode(code: string): Observable<Degree | undefined> {
    return this.degrees$.pipe(
      map(degrees => degrees.find(d => d.code === code))
    );
  }

  getCourseByCode(code: string): Observable<Course | undefined> {
    return this.courses$.pipe(
      map(courses => courses.find(c => c.code === code))
    );
  }

  // Data manipulation methods
  addStudent(student: Student): void {
    const currentStudents = this.studentsSubject.value;
    this.studentsSubject.next([...currentStudents, student]);
  }

  updateStudent(id: number, updatedStudent: Student): void {
    const currentStudents = this.studentsSubject.value;
    const index = currentStudents.findIndex(s => s.id === id);
    if (index !== -1) {
      currentStudents[index] = updatedStudent;
      this.studentsSubject.next([...currentStudents]);
    }
  }

  removeStudent(id: number): void {
    const currentStudents = this.studentsSubject.value;
    this.studentsSubject.next(currentStudents.filter(s => s.id !== id));
  }
} 