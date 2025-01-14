export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  dateOfBirth: string;
  email: string;
  degree: string;
  year: number;
  courses: StudentCourse[];
}

export interface StudentCourse {
  code: string;
  semester: string;
  grade?: {
    percentage: number;
    letter: string;
  };
}

export interface Course {
  id: number;
  name: string;
  code: string;
  semester: string;
  yearOfStudy: number;
}

export interface Degree {
  id: number;
  name: string;
  code: string;
  yearsToComplete: number;
  active: boolean;
} 