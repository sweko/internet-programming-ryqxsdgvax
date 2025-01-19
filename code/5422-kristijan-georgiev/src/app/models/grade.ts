export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: string;
    dateOfBirth: string; // ISO date string format
    email: string;
    degree: string;
    year: number;
    courses: Course[];
}

export interface Course {
    id: number;
    name: string;
    code: string;
    grade?: Grade;
    semester: string;
    yearofStudy: number
}

export interface Grade {
    id: number;
    percentage: number;
    letter: string;
}