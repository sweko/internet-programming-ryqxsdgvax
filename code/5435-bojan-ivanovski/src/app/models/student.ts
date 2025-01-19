export interface CourseGrade {
    percentage: number;
    letter: string;
  }
  
  export interface Courses {
    code: string;
    grade?: CourseGrade;
    semester: 'autumn' | 'spring';
  }
  
  export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string; // format: "YYYY-NNNN"
    dateOfBirth?: string; // ISO 8601 date format
    email: string;
    degree: string;
    year: number; // between 1 and 4
    courses: Courses[];
  }