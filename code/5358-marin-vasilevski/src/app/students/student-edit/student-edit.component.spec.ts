import { TestBed } from '@angular/core/testing';
import { StudentEditComponent } from './student-edit.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';


const mockApiService = {
  getStudentById: (id: number) =>
    of({
      id,
      firstName: 'John',
      lastName: 'Doe',
      studentId: '2023-0001',
      email: 'john.doe@example.com',
      dateOfBirth: '2000-01-01',
      degree: 'Computer Science',
    }),
  updateStudent: (id: number, student: any) => of({}),
};

const mockActivatedRoute = {
  snapshot: {
    params: { id: 1 },
  },
};

const mockRouter = {
  navigate: (path: any) => {
    console.log('Mock navigate called with:', path);
  },
};


async function testStudentEditComponent() {
  let component: StudentEditComponent;

 
  await TestBed.configureTestingModule({
    imports: [StudentEditComponent], 
    providers: [
      { provide: ApiService, useValue: mockApiService }, 
      { provide: ActivatedRoute, useValue: mockActivatedRoute }, 
      { provide: Router, useValue: mockRouter }, 
      FormBuilder,
    ],
  }).compileComponents();

  
  const fixture = TestBed.createComponent(StudentEditComponent);
  component = fixture.componentInstance;

 
  fixture.detectChanges();

 
  console.log('Component created:', component instanceof StudentEditComponent);
  console.log('Loaded student:', component.studentForm.value);

  
  component.saveChanges();
  console.log('Save changes triggered.');
}


testStudentEditComponent()
  .then(() => console.log('StudentEditComponent Tests Completed'))
  .catch((error) => console.error('StudentEditComponent Tests Failed:', error));
