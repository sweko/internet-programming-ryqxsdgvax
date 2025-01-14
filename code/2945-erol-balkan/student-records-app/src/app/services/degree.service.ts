import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Degree {
    id: number;
    name: string;
    code: string;
    yearsToComplete: number;
    active: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class DegreeService {
    private apiUrl = 'https://localhost:3000/degrees';

    constructor(private http: HttpClient) { }

    getDegrees(): Observable<Degree[]> {
        return this.http.get<Degree[]>(this.apiUrl);
    }
}
