import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Degree } from '../models/degree.model';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {

  private apiUrl = "http://localhost:3000/degrees";
  constructor(private httpClient: HttpClient) {}


  getDegrees(): Observable<Degree[]>{
    return this.httpClient.get<Degree[]>(`${this.apiUrl}`);
  }

}
