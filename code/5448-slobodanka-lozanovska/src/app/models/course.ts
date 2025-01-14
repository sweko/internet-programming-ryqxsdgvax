export interface Course{
    id: number, // required, unique
    name: string, // required
    code: string, // required, 2-4 uppercase letters followed by 3 numbers
    semester: string, // required, "autumn" or "spring"
    yearOfStudy: number // required, 1-4  
}