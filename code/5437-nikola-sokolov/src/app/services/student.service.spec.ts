import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController; // For mocking HTTP requests

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule
      providers: [StudentService] // Provide the StudentService
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController); // Get the mock HTTP controller
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch students', () => {
    const dummyStudents = [
      { id: 1, firstName: 'John', lastName: 'Doe', studentId: '2023-0001', email: 'john.doe@example.com', year: 3 },
      { id: 2, firstName: 'Jane', lastName: 'Smith', studentId: '2023-0002', email: 'jane.smith@example.com', year: 2 }
    ];

    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(2);
      expect(students).toEqual(dummyStudents);
    });

    const req = httpMock.expectOne('https://localhost:3000/students'); // URL should match your API endpoint
    expect(req.request.method).toBe('GET');
    req.flush(dummyStudents); // Simulate a response with dummy data
  });

  it('should delete a student', () => {
    const studentId = 1;

    service.deleteStudent(studentId).subscribe((response) => {
      expect(response).toBeNull(); // Expect a null response or the appropriate response
    });

    const req = httpMock.expectOne(`https://localhost:3000/students/${studentId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Simulate a successful delete
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no HTTP requests are pending
  });
});
