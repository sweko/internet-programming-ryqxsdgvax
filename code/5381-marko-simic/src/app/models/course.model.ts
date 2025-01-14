export interface Course {
    id: number;
    name: string;
    code: string; // 2-4 uppercase letters followed by 3 numbers
    semester: string; // "autumn" or "spring"
    yearOfStudy: number; // Between 1 and 4
  }
  