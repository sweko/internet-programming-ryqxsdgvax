import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';


async function testApiService() {
  const baseUrl = 'https://localhost:3000'; 
  let service: ApiService;
  let httpMock: HttpTestingController;

 
  await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ApiService],
  }).compileComponents();

 
  service = TestBed.inject(ApiService);
  httpMock = TestBed.inject(HttpTestingController);


  service.getStudents().subscribe((students) => {
    console.log('getStudents() result:', students);
  });

  let req = httpMock.expectOne(`${baseUrl}/students`);
  console.log('getStudents() request method:', req.request.method);
  req.flush([{ id: 1, firstName: 'John', lastName: 'Doe' }]);


  service.getStudentById(1).subscribe((student) => {
    console.log('getStudentById(1) result:', student);
  });

  req = httpMock.expectOne(`${baseUrl}/students/1`);
  console.log('getStudentById(1) request method:', req.request.method); 
  req.flush({ id: 1, firstName: 'John', lastName: 'Doe' });

 
  const newStudent = { firstName: 'Jane', lastName: 'Smith' };
  service.createStudent(newStudent).subscribe((student) => {
    console.log('createStudent() result:', student);
  });

  req = httpMock.expectOne(`${baseUrl}/students`);
  console.log('createStudent() request method:', req.request.method); 
  req.flush({ id: 2, ...newStudent });


  service.getCourses().subscribe((courses) => {
    console.log('getCourses() result:', courses);
  });

  req = httpMock.expectOne(`${baseUrl}/courses`);
  console.log('getCourses() request method:', req.request.method); 
  req.flush([{ id: 1, name: 'Intro to Programming', code: 'CS101' }]);

 
  service.getDegrees().subscribe((degrees) => {
    console.log('getDegrees() result:', degrees);
  });

  req = httpMock.expectOne(`${baseUrl}/degrees`);
  console.log('getDegrees() request method:', req.request.method); 
  req.flush([{ id: 1, name: 'Computer Science', code: 'CS', yearsToComplete: 4 }]);

  
  httpMock.verify();
}


testApiService()
  .then(() => console.log('API Service Tests Completed'))
  .catch((error) => console.error('API Service Tests Failed:', error));
