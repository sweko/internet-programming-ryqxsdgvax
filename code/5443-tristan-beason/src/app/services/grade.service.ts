import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  calculateAverageGrade(grades: number[]): number {
    if (!grades.length) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    return Number((sum / grades.length).toFixed(2));
  }

  calculateLetterGrade(percentage: number): string {
    if (percentage >= 97) return 'A+';
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

  isPassingGrade(percentage: number): boolean {
    return percentage >= 60;
  }

  getGradeRange(letter: string): { min: number; max: number } {
    const ranges: Record<string, { min: number; max: number }> = {
      'A+': { min: 97, max: 100 },
      'A': { min: 93, max: 96 },
      'A-': { min: 90, max: 92 },
      'B+': { min: 87, max: 89 },
      'B': { min: 83, max: 86 },
      'B-': { min: 80, max: 82 },
      'C+': { min: 77, max: 79 },
      'C': { min: 73, max: 76 },
      'C-': { min: 70, max: 72 },
      'D+': { min: 67, max: 69 },
      'D': { min: 63, max: 66 },
      'D-': { min: 60, max: 62 },
      'F': { min: 0, max: 59 }
    };
    return ranges[letter] || { min: 0, max: 0 };
  }
} 