export interface CourseRecord {
    code: string;
    grade?: {
        percentage: number;
        letter: string;
    };
    semester: string;
}

export interface Course {
    id: number;
    name: string;
    code: string;
    semester: string;
    yearOfStudy: number;
}