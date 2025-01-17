export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  dateOfBirth: string;
  email: string;
  degree: string;
  year: number;
  courses: Course[];
}
export interface Course {
  code: string;
  grade?: Grade;
  semester: string;
}
export type Grade = {
  percentage: number;
  letter: string;
}
export type Degree = {
  id: number;
  name: string;
  code: string;
  yearsToComplete: number;
  active: boolean
}
