export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    studentId: number;
    dateOfBirth: string;
    email: string;
    degree: string;
    year: number;
    courses: Course[];
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
    grade?: Grade;
}

export interface Grade {
    percentage: number;
    letter: string;
}