export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string;
    dateOfBirth: string;
    email: string;
    degree: string;
    year: number;
    courses: {
      code: string;
      grade?: {
        percentage: number;
        letter: string;
      };
      semester: string;
    }[];
  }