import { CourseRecord } from "./course.model";

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