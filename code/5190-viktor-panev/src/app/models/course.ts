export interface Course {
    id: number; // Unique identifier
    name: string; // Name of the course (e.g., "Data Structures")
    code: string; // Code for the course (e.g., "CS101")
    semester: 'autumn' | 'spring'; // Semester
    yearOfStudy: number; // Year of study (1-4)
  }
  