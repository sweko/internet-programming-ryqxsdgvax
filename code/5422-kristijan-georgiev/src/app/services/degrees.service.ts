import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grade} from '../models/grade';
import { Observable} from 'rxjs';
const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class DegreesService {

    apiUrl: any;
    grade: Grade[] = [];

    constructor(private http: HttpClient) { }

    getGrades(): Observable<Grade[]> {
        return this.http.get<Grade[]>(`${BASE_URL}/degrees`);
    }

    updateGrade(grade: Grade): Observable<Grade> {
        return this.http.put<Grade>(`${BASE_URL}/degrees/${grade.percentage}`, grade);
    }

    deleteGrade(gradeId: number): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/degress/${gradeId}`);
    }

    addGrade(newGrade: Grade): Observable<Grade> {
        const { percentage, ...gradeWithoutId } = newGrade;
        return this.http.post<Grade>(`${BASE_URL}/degrees`, gradeWithoutId);
    }

    getGradeById(gradeId: number): Observable<Grade> {
        return this.http.get<Grade>(`${BASE_URL}/degress/${gradeId}`);
    }
}
