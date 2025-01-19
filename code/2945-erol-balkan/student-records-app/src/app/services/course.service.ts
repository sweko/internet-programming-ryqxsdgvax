import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Course {
    id: number;
    name: string;
    code: string;
    semester: string;
    yearOfStudy: number;
}

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiUrl = 'https://localhost:3000/courses';

    constructor(private http: HttpClient) { }

    getCourses(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl);
    }
}
