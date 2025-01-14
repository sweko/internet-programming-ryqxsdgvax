import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Student } from './models/student';
import { Degree } from './models/degree';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = 'http://localhost:3000/students';
  private degreesUrl = 'http://localhost:3000/degrees';

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<any[]> {
    return forkJoin([this.http.get<Student[]>(this.studentsUrl), this.http.get<Degree[]>(this.degreesUrl)]).pipe(
      map(([students, degrees]) =>
        students.map((student) => {
          const degreeName = degrees.find((degree) => degree.code === student.degree)?.name || 'Unknown';
          const gradedCourses = student.courses.filter((course) => course.grade);
          const averageGrade =
            gradedCourses.length > 0
              ? gradedCourses.reduce((sum, course) => sum + course.grade!.percentage, 0) / gradedCourses.length
              : null;

          return {
            ...student,
            degreeName,
            averageGrade: averageGrade ? averageGrade.toFixed(2) : 'N/A',
            letterGrade: averageGrade ? this.getLetterGrade(averageGrade) : 'N/A',
            numberOfCourses: student.courses.length,
            numberOfGradedCourses: gradedCourses.length
          };
        })
      )
    );
  }

  // Get letter grade based on average percentage
  private getLetterGrade(percentage: number): string {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  }

  // Get a single student by ID
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.studentsUrl}/${id}`);
  }

  // Create a new student
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.studentsUrl, student);
  }

  // Update an existing student
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.studentsUrl}/${id}`, student);
  }

  // Delete a student
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.studentsUrl}/${id}`);
  }

  // Add this in your StudentService (same as previous code)

getDegrees(): Observable<Degree[]> {
  return this.http.get<Degree[]>(this.degreesUrl);  // degreesUrl: 'http://localhost:3000/degrees'
}

}
