import { TestBed } from '@angular/core/testing';
import { StudentDetailsComponent } from './student-details.component';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Mock services
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
};

const mockActivatedRoute = {
  snapshot: {
    params: { id: 1 },
  },
};

// Test function
async function testStudentDetailsComponent() {
  let component: StudentDetailsComponent;

  // Configure the testing module
  await TestBed.configureTestingModule({
    imports: [StudentDetailsComponent], // Import the standalone component
    providers: [
      { provide: ApiService, useValue: mockApiService }, // Mock the ApiService
      { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Mock the ActivatedRoute
    ],
  }).compileComponents();

  // Create the component instance
  const fixture = TestBed.createComponent(StudentDetailsComponent);
  component = fixture.componentInstance;

  // Trigger change detection
  fixture.detectChanges();

  // Perform assertions
  console.log('Component created:', component instanceof StudentDetailsComponent);
  console.log('Fetched student:', component.student);

  // Access rendered DOM
  const compiled = fixture.nativeElement as HTMLElement;
  console.log('Rendered student name:', compiled.querySelector('p:first-child')?.textContent);
}

// Run the test function
testStudentDetailsComponent()
  .then(() => console.log('StudentDetailsComponent Tests Completed'))
  .catch((error) => console.error('StudentDetailsComponent Tests Failed:', error));
