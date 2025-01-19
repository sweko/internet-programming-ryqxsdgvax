import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { Student } from '../../models/student.interface';
import { Degree } from '../../models/degree.interface';
import { Course } from '../../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  private degreesSubject = new BehaviorSubject<Degree[]>([]);
  private coursesSubject = new BehaviorSubject<Course[]>([]);

  students$ = this.studentsSubject.asObservable();
  degrees$ = this.degreesSubject.asObservable();
  courses$ = this.coursesSubject.asObservable();

  setStudents(students: Student[]): void {
    this.studentsSubject.next(students);
  }

  setDegrees(degrees: Degree[]): void {
    this.degreesSubject.next(degrees);
  }

  setCourses(courses: Course[]): void {
    this.coursesSubject.next(courses);
  }

  getStudentById(id: number): Observable<Student | undefined> {
    return new Observable((subscriber: Subscriber<Student | undefined>) => {
      const student = this.studentsSubject.value.find((s: Student) => s.id === id);
      subscriber.next(student);
      subscriber.complete();
    });
  }

  getDegreeByCode(code: string): Observable<Degree | undefined> {
    return new Observable((subscriber: Subscriber<Degree | undefined>) => {
      const degree = this.degreesSubject.value.find((d: Degree) => d.code === code);
      subscriber.next(degree);
      subscriber.complete();
    });
  }

  getCourseByCode(code: string): Observable<Course | undefined> {
    return new Observable((subscriber: Subscriber<Course | undefined>) => {
      const course = this.coursesSubject.value.find((c: Course) => c.code === code);
      subscriber.next(course);
      subscriber.complete();
    });
  }
} 