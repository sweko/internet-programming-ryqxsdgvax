import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course } from '../interfaces/course.model';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private apiUrl = 'https://localhost:3000/courses';

    constructor(private http: HttpClient) {}

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error.message);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}