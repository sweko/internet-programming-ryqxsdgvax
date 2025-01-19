export interface Grade {
    percentage: number;
    letter: string;
}

export interface CourseRecord {
    code: string;
    grade?: Grade;
    semester: 'autumn' | 'spring';
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
    courses: CourseRecord[];
}
