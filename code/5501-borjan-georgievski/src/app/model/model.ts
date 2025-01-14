export interface Course {
    id: number;
    name: string;
    code: string;
    semester: 'autumn' | 'spring';
    yearOfStudy: number;
    grade?: {  
      percentage: number; 
      letter: string;     
    };
  }
  
  export interface Degree {
    id: number;
    name: string;
    code: string;
    yearsToComplete: number;
    active: boolean;
  }
  
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
  