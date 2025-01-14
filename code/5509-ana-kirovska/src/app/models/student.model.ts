export enum SemesterType{
    autumn = "autumn",
    spring = "spring"
}

export interface Grade{
    letter:string;
    percentage:number
}

export interface Course{
    code:string;
    semester:SemesterType;
    grade?:Grade;
}

export interface Student{
    id:number;
    firstName: string;
    lastName: string;
    studentId: string;
    dateOfBirth: string;
    email: string;
    degree: string;
    year: number;
    courses:Course[];
}