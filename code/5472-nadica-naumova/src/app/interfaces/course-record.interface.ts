import { Grade } from './grade.interface';

 
export interface CourseRecord {
    code: string;
    grade?: {
      percentage: number;
      letter: string;
    };
    semester: 'autumn' | 'spring';
  }