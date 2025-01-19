import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../src/app/models/student.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private baseUrl = 'https://localhost:3000';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  }
}
