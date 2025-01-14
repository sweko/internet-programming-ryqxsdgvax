export interface Degree 
{
    "id": "number", // required, unique
    "name": "string", // required
    "code": "string", // required, 2-4 uppercase letters
    "yearsToComplete": "number", // required, between 3 and 4
    "active": "boolean" // required
}