import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Course } from '../models/grade';
import { Observable} from 'rxjs';
const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

    apiUrl: any;
    course: Course[] = [];

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(`${BASE_URL}/courses`);
    }

    updateCourse(course: Course): Observable<Course> {
        return this.http.put<Course>(`${BASE_URL}/courses/${course.code}`, course);
    }

    deleteCourse(courseId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/courses/${courseId}`);
    }

    addCourse(newCourse: Course): Observable<Course> {
        const { code, ...courseWithoutcode } = newCourse;
        return this.http.post<Course>(`${BASE_URL}/courses`, courseWithoutcode);
    }

    getCourseById(coursecode: number): Observable<Course> {
        return this.http.get<Course>(`${BASE_URL}/courses/${coursecode}`);
    }
}
