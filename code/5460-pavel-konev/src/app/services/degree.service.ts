import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private apiUrl = 'http://localhost:3000/degrees';

  constructor(private http: HttpClient) { }

  getDegrees(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
