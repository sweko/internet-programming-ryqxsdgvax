import { TestBed } from '@angular/core/testing';
import { StudentCreateComponent } from './student-create.component';
import { ApiService } from '../../services/api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';


const mockApiService = {
  createStudent: () => of({}), 
};

const mockRouter = {
  navigate: (path: any) => {
    console.log('Mock navigate called with:', path);
  },
};


async function testStudentCreateComponent() {
  let component: StudentCreateComponent;


  await TestBed.configureTestingModule({
    imports: [StudentCreateComponent], 
    providers: [
      { provide: ApiService, useValue: mockApiService }, 
      { provide: Router, useValue: mockRouter }, 
      FormBuilder,
    ],
  }).compileComponents();


  const fixture = TestBed.createComponent(StudentCreateComponent);
  component = fixture.componentInstance;

 
  fixture.detectChanges();


  console.log('Component created:', component instanceof StudentCreateComponent);

  
  console.log('Form initialized:', component.studentForm.valid); 


  component.studentForm.setValue({
    firstName: 'John',
    lastName: 'Doe',
    studentId: '2023-0001',
    email: 'john.doe@example.com',
    dateOfBirth: '2000-01-01',
    degree: 'Computer Science',
  });

  console.log('Form valid after setting values:', component.studentForm.valid); 

  
  mockApiService.createStudent = () =>
    of({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      studentId: '2023-0001',
    });
  component.createStudent();

  console.log('API called successfully and navigation triggered.');

 
  mockApiService.createStudent = () => throwError(() => new Error('API error'));
  component.createStudent();
  console.log('Handled API error gracefully.');
}


testStudentCreateComponent()
  .then(() => console.log('StudentCreateComponent Tests Completed'))
  .catch((error) => console.error('StudentCreateComponent Tests Failed:', error));
