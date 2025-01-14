export interface CourseRecord {
    code: string;
    grade?: {
      percentage: number;
      letter: string;
    };
    semester: string;
  }
  
  export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string; // Format: YYYY-NNNN
    dateOfBirth: string; // ISO 8601 format
    email: string;
    degree: string;
    year: number; // Between 1 and 4
    courses: CourseRecord[];
  }
  