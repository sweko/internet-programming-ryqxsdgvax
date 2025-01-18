 // src/app/services/degree.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Degree } from '../interfaces/degree.interface';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private baseUrl = 'http://localhost:3000/degrees';

  constructor(private http: HttpClient) {}

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.baseUrl);
  }

  getDegree(id: number): Observable<Degree> {
    return this.http.get<Degree>(`${this.baseUrl}/${id}`);
  }
}
