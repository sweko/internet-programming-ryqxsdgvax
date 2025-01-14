import { Injectable } from '@angular/core';
import { Student, Grade } from '../../../models/student.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentUtilsService {
  calculateAverageGrade(student: Student): number | null {
    const gradedCourses = student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return null;

    const sum = gradedCourses.reduce((acc, course) => 
      acc + (course.grade?.percentage || 0), 0);
    return Number((sum / gradedCourses.length).toFixed(2));
  }

  getLetterGrade(percentage: number): string {
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 63) return 'D';
    if (percentage >= 60) return 'D-';
    return 'F';
  }

  getFullName(student: Student, lastNameFirst = false): string {
    return lastNameFirst 
      ? `${student.lastName}, ${student.firstName}`
      : `${student.firstName} ${student.lastName}`;
  }

  getSuccessRate(student: Student): number {
    const gradedCourses = student.courses.filter(course => course.grade);
    if (gradedCourses.length === 0) return 0;

    const passedCourses = gradedCourses.filter(course => 
      (course.grade?.percentage || 0) >= 60);
    return Number(((passedCourses.length / gradedCourses.length) * 100).toFixed(2));
  }
} 