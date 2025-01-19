import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Degree } from '../models/degree.model';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private apiUrl='http://localhost:3000/degrees'

  constructor(private http:HttpClient) { }

  fetchDegrees(){
    return this.http.get<Degree[]>(this.apiUrl);
  }
}
