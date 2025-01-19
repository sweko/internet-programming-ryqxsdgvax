 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:3000/courses';
  private courseCache = new Map<string, Course>();

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl).pipe(
      map(courses => {
       
        courses.forEach(course => this.courseCache.set(course.code, course));
        return courses;
      })
    );
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

 
  getCourseNameByCode(code: string): string {
    const course = this.courseCache.get(code);
    return course ? course.name : code;
  }

  
  getCourseByCode(code: string): Course | undefined {
    return this.courseCache.get(code);
  }
}