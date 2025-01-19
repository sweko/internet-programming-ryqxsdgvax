import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Degree } from '../models/degree.model';

@Injectable({
  providedIn: 'root',
})
export class DegreeService {
  private API_URL = 'https://localhost:3000/degrees';

  constructor(private http: HttpClient) {}

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(this.API_URL);
  }
}
