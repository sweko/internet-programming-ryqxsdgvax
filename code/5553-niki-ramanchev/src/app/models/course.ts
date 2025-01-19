export interface Course {
  id: number; 
  name: string;
  code: string; 
  semester: 'autumn' | 'spring';
  yearOfStudy: number;
}
