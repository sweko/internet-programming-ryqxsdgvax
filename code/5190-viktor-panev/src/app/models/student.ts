export interface Student {
    id: number; // Unique identifier
    firstName: string; // First name of the student
    lastName: string; // Last name of the student
    studentId: string; // Format: "YYYY-NNNN"
    dateOfBirth: string; // ISO 8601 date format
    email: string; // Valid email address
    degree: string; // Valid degree code from degrees endpoint
    year: number; // Year of study (1-4)
    courses: CourseRecord[]; // Array of course records
  }
  
  export interface CourseRecord {
    code: string; // Valid course code from courses endpoint
    grade?: Grade; // Optional grade
    semester: 'autumn' | 'spring'; // Semester
  }
  
  export interface Grade {
    percentage: number; // Percentage (0-100)
    letter: string; // Letter grade (e.g., "A", "B", "C", etc.)
  }
  