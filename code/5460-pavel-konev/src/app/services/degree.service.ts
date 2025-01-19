import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Degree } from '../interfaces/degree.model';

@Injectable({
    providedIn: 'root',
})
export class DegreeService {
    private apiUrl = 'https://localhost:3000/degrees';

    constructor(private http: HttpClient) {}

    getDegrees(): Observable<Degree[]> {
        return this.http.get<Degree[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('An error occurred:', error.message);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}