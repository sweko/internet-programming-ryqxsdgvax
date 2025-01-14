export interface Student {
    id: number; 
    firstName: string;
    lastName: string;
    studentId: string; 
    dateOfBirth: string; 
    email: string; 
    degree: string; 
    year: number; 
    courses?: StudentCourse[];
}

export interface StudentCourse {
    code: string; 
    grade?: Grade;
    semester: 'autumn' | 'spring';
}

export interface Grade {
    percentage: number; 
    letter: string; 
}