export interface Course {
    id: number;
    name: string;
    code: string; // 2-4 uppercase letters followed by 3 numbers
    semester: 'autumn' | 'spring';
    yearOfStudy: number; // 1-4
  }