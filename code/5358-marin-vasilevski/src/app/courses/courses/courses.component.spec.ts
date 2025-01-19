import { TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';

// Mock ApiService
const mockApiService = {
  getCourses: () => of([
    { name: 'Intro to Programming', code: 'CS101', yearOfStudy: 1, semester: 'Autumn' },
    { name: 'Data Structures', code: 'CS201', yearOfStudy: 2, semester: 'Spring' },
  ]),
};

// Test function
async function testCoursesComponent() {
  // Configure and compile the component
  await TestBed.configureTestingModule({
    imports: [CoursesComponent], // Import the standalone component
    providers: [{ provide: ApiService, useValue: mockApiService }], // Mock the ApiService
  }).compileComponents();

  // Create the component
  const fixture = TestBed.createComponent(CoursesComponent);
  const component = fixture.componentInstance;

  // Trigger change detection
  fixture.detectChanges();

  // Perform assertions
  const compiled = fixture.nativeElement as HTMLElement;

  console.log('Component created:', component instanceof CoursesComponent);

  // Check the rendered courses
  const courseItems = compiled.querySelectorAll('li');
  console.log('Number of courses:', courseItems.length);
  console.log('First course:', courseItems[0]?.textContent?.trim());
  console.log('Second course:', courseItems[1]?.textContent?.trim());
}

// Execute the test
testCoursesComponent().then(() => {
  console.log('Testing completed.');
}).catch((error) => {
  console.error('Test failed:', error);
});
