export interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
  studentCount?: number;
  passRate?: number;
  averageGrade?: number;
} 