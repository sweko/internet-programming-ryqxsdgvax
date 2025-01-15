import { SemesterType } from "./student.model";
export interface Course{
    id: number;
    name: string;
    code: string;
    semester: SemesterType;
    yearOfStudy: number;
}