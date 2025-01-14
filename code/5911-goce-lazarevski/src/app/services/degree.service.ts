import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Degree, Student } from '../models/student';

const BASE_URL = 'https://localhost:3000/degrees';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  constructor(private http: HttpClient) {}

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(BASE_URL);
  }
}
