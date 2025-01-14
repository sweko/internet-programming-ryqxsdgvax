export interface Student {
    id: number; 
    firstName: string;
    lastName: string;
    studentId: string; 
    dateOfBirth: string; 
    email: string; 
    degree: string;
    year: number; 
    courses: Course[];
  }
  
  export interface Course {
    code: string;
    grade?: { 
      percentage: number; 
      letter: string; 
    };
    semester: string; 
  }
  
  export interface Degree {
    id: number; 
    name: string; 
    code: string; 
    yearsToComplete: number; 
    active: boolean;
  }
  
  export interface Course {
    id: number;
    name: string;
    code: string;
    semester: string;
    yearOfStudy: number;
  }