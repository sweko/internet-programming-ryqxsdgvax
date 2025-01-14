export interface Student {
    
    id: number, // required, unique
    firstName: string, // required
    lastName: string, // required
    studentId: string, // required, format: "YYYY-NNNN" where Y is year, N is number
    dateOfBirth: string, // required, ISO 8601 date format
    email: string, // required, must be a valid email
    degree: string, // required, must be a valid degree from degrees endpoint
    year: number,
    averageGrade: number, // required, between 1 and 4
    courses: Courses[] // array of course records
}

export interface Courses {
   code: string, // must be a valid course from courses endpoint
   grade: { // optional, if course is graded
                percentage: number,  // required, between 0 and 100
                letter: string // required, calculated from percentage, according to grading scale
            },
            semester: string // "autumn" or "spring", required
}

