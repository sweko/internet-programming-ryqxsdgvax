import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) {}


  getCourses(): Observable<Course[]>{
    return this.httpClient.get<Course[]>('http://localhost:3000/courses');
  }
}
