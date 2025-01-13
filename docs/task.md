# Specification

Build a web application that allows users to view and manage student records and their grades.

## Data

The data is provided via an API that provides the data. The url of the API is [https://localhost:3000](https://localhost:3000).

The api exposes the following endpoints:

- `GET /students` - Returns a list of students
- `GET /students/:id` - Returns a single student by ID
- `POST /students` - Creates a new student
- `PUT /students/:id` - Updates an existing student
- `DELETE /students/:id` - Deletes an existing student

- `GET /degrees` - Returns a list of degrees
- `GET /courses` - Returns a list of courses

### Student Data

The format of the `student` object is as follows:

```jsonc
{
    "id": "number", // required, unique
    "firstName": "string", // required
    "lastName": "string", // required
    "studentId": "string", // required, format: "YYYY-NNNN" where Y is year, N is number
    "dateOfBirth": "string", // required, ISO 8601 date format
    "email": "string", // required, must be a valid email
    "degree": "string", // required, must be a valid degree from degrees endpoint
    "year": "number", // required, between 1 and 4
    "courses": [ // array of course records
        {
            "code": "string", // must be a valid course from courses endpoint
            "grade": { // optional, if course is graded
                "percentage": "number",  // required, between 0 and 100
                "letter": "string" // required, calculated from percentage, according to grading scale
            },
            "semester": "string" // "autumn" or "spring", required
        }
    ]
}
```

### Degree Data

The format of the `degree` object is as follows:

```jsonc
{
    "id": "number", // required, unique
    "name": "string", // required
    "code": "string", // required, 2-4 uppercase letters
    "yearsToComplete": "number", // required, between 3 and 4
    "active": "boolean" // required
}
```

### Course Data

The format of the `course` object is as follows:

```jsonc
{
    "id": "number", // required, unique
    "name": "string", // required
    "code": "string", // required, 2-4 uppercase letters followed by 3 numbers
    "semester": "string", // required, "autumn" or "spring"
    "yearOfStudy": "number" // required, 1-4
}
```

### Notes

- It is not guaranteed that all students will have all courses for their year
- The grade field in the student course record is optional (for courses not yet graded)
- All courses have a specific year of study and semester when they should be taken
- Every degree has a defined number of years to complete (either 3 or 4)
- Not all courses and degrees may be active

## Application structure

The application should consist of the following pages:

- Student list page, available at `/students`
- Student details page, available at `/students/:id`
- Student edit page, available at `/students/:id/edit`
- Student create page, available at `/students/create`
- ***Bonus*** Degrees list page, available at `/degrees`
- ***Bonus*** Courses list page, available at `/courses`
- Statistics page, available at `/statistics`
- About page, available at `/about`

Additionally, the application should have the following features:

- The home page should be the student list page
- The application should have a navigation bar that allows the user to navigate between the pages
- The application should have a footer that displays the current year, the student details (ID and name) and a link to the about page

### Student List Page

The student list page should display a list of students, with the following information:

#### Data Format

The list of students should show the following information:

- Student ID: The student's ID
- Name: First and last name combined
- Degree: The name of the degree (not the code)
- Year: Current year of study
- Email: Student's email
- Average Grade Percentage: Calculated from all graded courses (if available, otherwise "N/A"). The average should be rounded to 2 decimal places, and calculated as the sum of all grades divided by the number of grades.
- ***Bonus*** Average Letter Grade: Calculated from the average grade percentage according to the grading scale
- Number of Courses: Total number of Courses assigned
- Number of Grades: Number of courses that have grades

#### Actions

Every list item should have the following actions:

- View: Navigates to the student details page
- Edit: Navigates to the student edit page
- Delete: Deletes the student from the list

The delete action should display a confirmation dialog before deleting the student. ***Bonus*** The dialog should not be a browser default dialog.

#### Features

- The list should be paginated with 10 students per page
- The list should display the total number of students
- The page should have a toggle to switch between "FirstName LastName" and "LastName, FirstName" display formats (default is "FirstName LastName", and affects the sorting order)
- The page should have a button that allows the user to add a new student. Clicking on the button should navigate to the student create page.

#### Sorting (bonus)

All fields displayed should be sortable, i.e. clicking on the column header should sort the list by that column. The default sort order should be ascending, and clicking on the same column header again should reverse the sort order.

#### Filtering (bonus)

The list should be filterable by the following fields:

- Student ID/Name: Free text input that filters by either student ID or name
- Degree: Dropdown list of Degrees
- Year: Multiple select of years (1-4)
- ***Bonus*** Grade Range: Two number inputs for minimum and maximum grade percentage
- ***Bonus*** Grade Range: Two dropdown inputs for minimum and maximum grade letter

### Student Details Page

The student details page should display details of a single student, with the following information:

#### Personal Information
- Student ID
- Full Name
- Date of Birth
- Email
- Degree
- Year of Study

#### Academic Information
- List of courses with:
  - Course name
  - Year of study
  - Semester
  - Grade (if available)
  - "Not Graded" status for Courses without grades
- Average grade (if there are any grades, otherwise "N/A")
- Success rate (percentage of passed courses vs total courses)

#### Actions
- Edit button: Takes user to edit page
- Delete button: Removes student with confirmation
- Back to list button

### Student Edit Page

The student edit page should allow editing of a student's information:

#### Editable Fields
- First Name (required)
- Last Name (required)
- Email (required, must be valid email)
- Degree (required, select from available Degrees)
- Year (required, must be valid for selected degree)

#### Course Management
- List of existing courses with grades
- Ability to add grades to ungraded courses
- Cannot modify course list

The page should have a save button that saves the student and navigates back to the student details page.

### Statistics Page

The statistics page should display the following information:

- Total number of students
- Average grade across all students
- Number of students per degree
- Number of students per year
- **Bonus**: Pass rate per course (percentage of students with a passing grade percentage)
- **Bonus**: Grade distribution chart

### About Page

The about page should display the following information:

- The name of the student
- The ID of the student
- The current year
- A link to the github repository of the project

## Technical Requirements

- The application should be implemented using Angular
- The application must use the following concepts:
  - Components and component lifecycle
  - Services for data management
  - Routing
  - Forms (either template-driven and reactive)
  - HTTP client for API communication
  - Basic TypeScript types and interfaces
- The application should have proper error handling for API calls
- The application should use proper data typing throughout
- ***Bonus*** The application should have a consistent and pleasant visual design
- The code should be properly formatted and commented where necessary
- The application should follow Angular best practices

## Grading Note

The calculation of a letter grade from a percentage should be done as follows:

- A (90-100%): Excellent performance
    - A+ (97-100%): Outstanding
    - A (93-96%): Excellent
    - A- (90-92%): Very Good

- B (80-89%): Above average performance
    - B+ (87-89%): Good
    - B (83-86%): Solid
    - B- (80-82%): Satisfactory

- C (70-79%): Average performance
    - C+ (77-79%): Fair
    - C (73-76%): Average
    - C- (70-72%): Below Average

- D (60-69%): Below average, but still passing
    - D+ (67-69%): Poor
    - D (63-66%): Very Poor
    - D- (60-62%): Barely Passing

- F (0-59%): Failing grade

(Note that this is an example used in the app development, and the actual grading scale may differ)